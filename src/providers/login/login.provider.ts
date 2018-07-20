import { StorageProvider } from './../storage/storage.provider';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UsuarioModel } from "../../model/usuario-model";
import { LoginModel } from '../../model/login.model';
import { TokenResponseModel } from '../../model/token-response.model';
import { Perfil } from '../../model/perfil.model';
import { PerfilEnum } from '../../enum/perfil-enum';

import { SafeHttp } from "../../utils/safe-http";

@Injectable()
export class LoginProvider {

  refreshUrl: string;

  userUrl: string;
    
  loginUrl: string;  

  constructor(
    private storageProvider: StorageProvider,
    private safeHttp: SafeHttp
  ){
    this.loginUrl = "/auth/";
    this.refreshUrl = "/auth/refresh";   
    this.userUrl  = "/usuario/logado";     
  }

  getAdmin(): UsuarioModel{

    let admin =  new UsuarioModel();
    
    admin.id = 1;
    admin.login = "admin";
    admin.nome = "Administrador do Sistema";
    admin.ativo = true;
    admin.perfil = new Perfil();
    admin.perfil.id = PerfilEnum.ROLE_ADMIN

    return admin;

  }

  public login(login: LoginModel): Promise<TokenResponseModel>{

    return new Promise((resolve, reject) => {
      
      this.safeHttp.post(this.loginUrl, login)
        .toPromise()
          .then(data => {
            this.storageProvider.setAccessToken(data.data.token);
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
          .then(resp => {
            this.storageProvider.setUsuarioSessao(resp.data)
            resolve(resp.data);
          })
          .catch( erro => {
            reject(erro);  
          });      
    });

  }

  getUsuarioLogado() : UsuarioModel{
    
    let usuarioLogado: UsuarioModel = this.storageProvider.getUsuarioSessao();

    if (usuarioLogado != undefined){
      usuarioLogado.onesignalId = this.storageProvider.getOneSignalId();
    }

    return usuarioLogado;

  } 

  logout(){
    this.storageProvider.clearCookies();
  }

}

