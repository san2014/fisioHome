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


/*   usuarioLogado: UsuarioModel;

  oneSignalId: string; */

  refreshUrl: string;

  userUrl: string;
    
  loginUrl: string;  

  constructor(
    private cookieService: CookieService,
    private safeHttp: SafeHttp,
    private fshUtils: FshUtils,
    private badge: Badge,
  ){
    this.loginUrl = "/auth";
    this.refreshUrl = "/auth/refresh";   
    this.userUrl  = "/usuario/logado";     
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

  public login(login: LoginModel): Promise<TokenResponseModel>{

    return new Promise((resolve, reject) => {
      
      this.safeHttp.post(this.loginUrl, login)
        .toPromise()
          .then(data => {
            this.setAccessToken(data.data.token);
            resolve(data);
          })
          .catch( erro => {
            reject(erro);  
          });

    });
        
  }

  public refreshToken(refreshToken): Observable<any>{
    return this.safeHttp.post(this.refreshUrl, {})
  }  

  getUsuarioAtual(token: string): Promise<UsuarioModel>{

    return new Promise((resolve, reject) => {
      this.safeHttp.get(this.userUrl)
        .toPromise()
          .then(data => {
            this.cookieService.putObject('usuarioLogado', data);
            resolve(data);
          })
          .catch( erro => {
            reject(erro);  
          });      
    });

  }

  getUsuarioLogado() : UsuarioModel{
    
    let usuarioLogado: UsuarioModel = <UsuarioModel> this.cookieService.getObject('usuarioLogado');
    
    if (usuarioLogado != undefined){
      usuarioLogado.onesignal_id = this.getOneSignalId();
    }

    return usuarioLogado;

  } 

  setOneSignalId(id: string){
    this.cookieService.put('oneSignalId', id);
  }

  getOneSignalId(): string{
    return this.cookieService.get('oneSignalId');
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


  
  public setAccessToken(valor: string){
    this.cookieService.put('accessToken', valor)
  }
  
  public getAccessToken(): string{
    return this.cookieService.get('accessToken');
  }

  clearCookie(): any {
    this.cookieService.removeAll();
}  

}

