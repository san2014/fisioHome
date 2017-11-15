import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { UsuarioModel } from "../../model/usuario-model";
import { ENDPOINT_API } from "../../app/app-constantes";
import { LoginModel } from './../../model/login.model';
import { ResponseModel } from "../../model/response-model";
import { SafeHttp } from "./../../utils/safe-http";

@Injectable()
export class LoginProvider {

  constructor(
    public http: Http,
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
    
    return new Promise((resolve, reject) => {

      if (login.usuario === "admin" && login.senha === "admin"){
        resolve(this.getAdmin());
      }

      this.safeHttp.get(`${ENDPOINT_API}/usuarios`, {params: {login: login.usuario}})
        .map(res => res.json())
          .subscribe(
            data => {
              data.forEach(element => {
                if (element.senha == login.senha){
                  resolve(data);
                } 
              });
              resolve(null);
            },
            (err) => {
              this.safeHttp.notResponse();
              reject('Erro');
            }
          )
          .unsubscribe();

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
