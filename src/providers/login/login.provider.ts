import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgIfContext } from '@angular/common';
import { Badge } from '@ionic-native/badge';
import { CookieService } from 'angular2-cookie/core';

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

@Injectable()
export class LoginProvider {

  usuarioLogado: UsuarioModel;

/*   token: string;

  refreshToken: string;

  accessToken: string; */

  oneSignalId: string;

  refreshUrl: string;

  userUrl: string;
    
  loginUrl: string;  

  constructor(
    private cookieService: CookieService,
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

  login(login: LoginModel): Promise<TokenResponseModel>{

    return new Promise((resolve, reject) => {

      const loginAuth = this.loginUrl + login.email + "&password=" + encodeURIComponent(login.senha);

      let headers = new HttpHeaders();

      headers = headers.set('Authorization', 'Basic ' + btoa(`${USER_API}:${PASS_API}`));
       
      this.http.post<TokenResponseModel>(loginAuth, {}, {headers: headers})
        .toPromise()
          .then(data => {
            this.setAccessToken(data.access_token);
            this.setRefreshToken(data.refresh_token);
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
            this.cookieService.putObject('usuarioLogado', data);
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
  
  getUsuarioSessao() : UsuarioModel{
    return <UsuarioModel> this.cookieService.getObject('usuarioLogado');
  }   
  
  setUsuarioSessao(usuario: UsuarioModel){
    this.cookieService.putObject('usuarioLogado', usuario)
  }
  
  logout(){
    this.cookieService.removeAll();
  }

  public refreshToken(refreshToken): Observable<any>{
  
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', 'Basic' + btoa(`${USER_API}:${PASS_API}`));  
    
    let urlCall: string = this.refreshUrl + refreshToken;

    return this.http.post<any>(urlCall, {headers: headers});

  }
  
  public setAccessToken(valor: string){
    this.cookieService.put('accessToken', valor)
  }
  
  public getAccessToken(): string{
    return this.cookieService.get('accessToken');
  }

  public setRefreshToken(valor: string){
    this.cookieService.put('refreshToken', valor)
  }

  public getRefreshToken(): string{
    return this.cookieService.get('refreshToken');
  }  

}
