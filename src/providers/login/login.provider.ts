import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgIfContext } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { OneSignal } from '@ionic-native/onesignal';

import { ENDPOINT_API, USER_API, PASS_API } from './../../app/app-constantes';

import { UsuarioModel } from "../../model/usuario-model";
import { LoginModel } from './../../model/login.model';
import { ResponseModel } from "../../model/response-model";
import { NotificacaoModel } from './../../model/notificacao-model';
import { TokenResponseModel } from './../../model/token-response.model';

import { SafeHttp } from "./../../utils/safe-http";
import { FshUtils } from './../../utils/fsh-util';
import { RequestOptions } from '@angular/http';


@Injectable()
export class LoginProvider {

  usuarioLogado: UsuarioModel;

  token: string;

  refreshToken: string;

  accessToken: string;

  oneSignalId: string;

  refreshUrl: string;

  userUrl: string;
    
  loginUrl: string;  

  constructor(
    private storage: Storage,
    private safeHttp: SafeHttp,
    private fshUtils: FshUtils,
    private badge: Badge,
    private http: HttpClient
  ){
    this.loginUrl = "http://localhost:8080/oauth/token?grant_type=password&username=";
    this.refreshUrl = "http://localhost:8080/oauth/token?grant_type=refresh_token&refresh_token=";   
    this.userUrl  = "http://localhost:8080/usuario/logado"; 
  }


  getAdmin(): UsuarioModel{

    let admin =  new UsuarioModel();
    
    admin.id = 1;
    admin.login = "admin";
    admin.nome = "Administrador do Sistema";
    admin.flag_ativo = 1;
    admin.tipo = 1;

    return admin;

  }

  getToken(){
    return this.token;
  }

  initTokenRequest(): Promise<string>{
    
    return new Promise<string>((resolve, reject) => { 
      this.storage.get('accessToken')
        .then(token => {
          
          this.accessToken = token.accessToken;

          this.storage.get('refreshToken')
            .then(token => {
              
              this.accessToken = token.rereshToken;
              
              resolve (token.accessToken);
              
            });

        })
        .catch(erro => reject('erro')) 
    });

  }

  login(login: LoginModel): Promise<TokenResponseModel>{

    return new Promise((resolve, reject) => {

      const loginAuth = this.loginUrl + login.email + "&password=" + encodeURIComponent(login.senha);

      let headers = new HttpHeaders();

      headers = headers.set('Authorization', 'Basic ' + btoa(`${USER_API}:${PASS_API}`));
       
      this.http.post<TokenResponseModel>(loginAuth, {}, {headers: headers})
        .toPromise()
          .then(data => {
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            resolve(data);
          })
          .catch( erro => {
            console.log(erro);
            this.safeHttp.notResponse();
            reject(erro);  
          });

    });
        
  }

  getUsuarioAtual(token: string): Promise<UsuarioModel>{

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${token}`);

      this.http.get<UsuarioModel>(this.userUrl, {headers: headers})
        .toPromise()
          .then(data => {
            this.usuarioLogado = data;
            resolve(data);
          })
          .catch( erro => {
            reject(erro);  
          });      

    });

  }

  getUsuarioLogado() : UsuarioModel{

    if (this.usuarioLogado != undefined){
      this.usuarioLogado.onesignal_id = this.oneSignalId;
    }
    
    return this.usuarioLogado;
    
  } 

  setOneSignalId(id: string){
    this.oneSignalId = id;
  }

  getOneSignalId(): string{
    return this.oneSignalId;
  }
  
  getUsuarioSessao() : Promise<UsuarioModel>{

    return new Promise( (resolve, reject) => {
      this.storage.get('usuarioLogado')
        .then(data => {

          if (Array.isArray(data)){

            this.usuarioLogado = data[0];
            
            resolve(data[0]);

          }else{

            this.usuarioLogado = data;

            resolve(data);

          }

        })
        .catch(() => {
          reject('Erro')
        });
    });

  }   
  
  setUsuarioSessao(usuario: UsuarioModel): Promise<boolean>{

    return new Promise ( (resolve, reject) => {

      this.storage.set('usuarioLogado', usuario)
        .then(() => {
            this.usuarioLogado = usuario;
            resolve(true);
            error => { 
              reject('Ocorreu um erro ao inserir dados na sessao');
            }
        })
        .catch(() => {
          reject('Ocorreu um erro ao inserir dados na sessao');
        })
      }

    );    

  }
  
  logout(): Promise<ResponseModel>{
    
    let response: ResponseModel;

    return new Promise( (resolve, reject) => {
      this.storage.clear()
        .then(() => {
            this.usuarioLogado = undefined;
            this.accessToken = undefined;
            this.token = undefined;
            this.refreshToken = undefined;
            response = {msg: 'Desconectado com sucesso', type: 1}
            resolve(response);
        })
        .catch(() => {
          response = {msg: 'Desculpe, ocorreu um erro ao desconectar. Tente nvamente.', type: 0}
          reject(response);
        })
    });

  }

  public getAccessToken(refreshToken){
  
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', 'Basic' + btoa(`${USER_API}:${PASS_API}`));  
    
    let urlCall: string = this.refreshUrl + refreshToken;

    return this.http.post<any>(urlCall, {headers: headers});

  }   

}
