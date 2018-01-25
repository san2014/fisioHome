
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { OneSignal } from '@ionic-native/onesignal';

import { UsuarioModel } from "../../model/usuario-model";
import { LoginModel } from './../../model/login.model';
import { ResponseModel } from "../../model/response-model";

import { SafeHttp } from "./../../utils/safe-http";
import { FshUtils } from './../../utils/fsh-util';

@Injectable()
export class LoginProvider {

  usuarioLogado: UsuarioModel;

  token: string;

  oneSignalId: string;

  constructor(
    private storage: Storage,
    private safeHttp: SafeHttp,
    private oneSignal: OneSignal,
    private fshUtils: FshUtils
  ){}


  getAdmin(): UsuarioModel{

    let admin =  new UsuarioModel();
    
    admin.id = 1;
    admin.login = "admin";
    admin.nome = "Administrador do Sistema";
    admin.flag_ativo = true;
    admin.tipo = 1;

    return admin;

  }

  getToken(){
    return this.token;
  }

  initTokenRequest(): Promise<string>{
    
    return new Promise((resolve, reject) => { 
      this.safeHttp.getToken()
      .toPromise()
        .then(token => {
          this.token = token.token;
          resolve (token.token);
        })
        .catch(erro => reject('erro')) 
    });

  }

  initOneSignalId(){
    this.oneSignal.getIds()
    .then(ids => {
      this.oneSignalId = ids.userId;
    });      
  }
  
  login(login: LoginModel): Promise<UsuarioModel>{

    return new Promise((resolve, reject) => {

      if (login.email === "admin" && login.senha === "admin"){
        this.usuarioLogado = this.getAdmin();
        return resolve(this.getAdmin());
      }

      let loginAPI = {"email": login.email, "senha": login.senha};

      this.safeHttp.post(`/usuario/login`, loginAPI, this.getToken())
        .toPromise()
          .then(data => {
            let usuario: UsuarioModel = this.fshUtils.convertUserAPI(data);
            this.usuarioLogado = usuario;
            resolve(usuario);
          })
          .catch( erro => {
            this.safeHttp.notResponse();
            reject(erro);  
          });
    });
        
  }

  getUsuarioLogado() : UsuarioModel{
    return this.usuarioLogado;
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
            response = {msg: 'Desconectado com sucesso', type: 1}
            resolve(response);
        })
        .catch(() => {
          response = {msg: 'Desculpe, ocorreu um erro ao desconectar. Tente nvamente.', type: 0}
          reject(response);
        })
    });

  }

}
