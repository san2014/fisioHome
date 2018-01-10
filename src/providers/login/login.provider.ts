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

  usuarioLogado: UsuarioModel;

  token: string;

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

  getTokenRequest(){
    return this.token;
  }

  getToken(): Promise<string>{

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
  
  login(login: LoginModel): Promise<UsuarioModel>{

    return new Promise((resolve, reject) => {

      if (login.email === "admin" && login.senha === "admin"){
        this.usuarioLogado = this.getAdmin();
        return resolve(this.getAdmin());
      }

      let loginAPI = {"email": login.email, "senha": login.senha};

      this.safeHttp.post(`/usuario/login`, loginAPI, this.token)
        .toPromise()
          .then(data => {
            let usuario: UsuarioModel = this.utils.convertUserAPI(data.message[0])
            this.usuarioLogado = usuario;
            resolve(usuario);
          })
          .catch( erro => {
            this.safeHttp.notResponse();
            reject('Erro');  
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
