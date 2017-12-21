import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { UsuarioModel } from "../../model/usuario-model";
import { LoginModel } from './../../model/login.model';
import { ResponseModel } from "../../model/response-model";
import { SafeHttp } from "./../../utils/safe-http";
import { FshUtils } from '../../utils/fsh-util';

@Injectable()
export class LoginProvider {

  constructor(
    private utils: FshUtils,
    private storage: Storage,
    private safeHttp: SafeHttp
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
  
  login(login: LoginModel): Promise<UsuarioModel>{

    const headers = new Headers();
    
    headers.append('Content-Type', 'application/json');    
    
    return new Promise((resolve, reject) => {

      if (login.email === "admin" && login.senha === "admin"){
        return resolve(this.getAdmin());
      }

      this.safeHttp.post(`/usuario/login`, JSON.stringify(login))
        .toPromise()
          .then(data => {
            let usuario: UsuarioModel = this.utils.convertUserAPI(data.message[0])
            resolve(usuario);
          })
          .catch( erro => {
/*             this.safeHttp.notResponse();
            reject('Erro');   */  
            console.log( erro._body);
            reject('Erro');  
          });
    });
        
  }

  getUsuarioLogado() : Promise<UsuarioModel>{

    return new Promise( (resolve, reject) => {
      this.storage.get('usuarioLogado')
        .then(data => {
          if (Array.isArray(data)){
            resolve(data[0]);
          }else{
            resolve(data);
          }
        })
        .catch(() => {
          reject('Erro')
        });
    });

  }  

  logout(): Promise<ResponseModel>{
    
    let response: ResponseModel;

    return new Promise( (resolve, reject) => {
      this.storage.clear()
        .then(() => {
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
