import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { UsuarioModel } from "../../model/usuario-model";
import { ENDPOINT_API } from "../../app/app-constantes";
import { LoginModel } from './../../model/login.model';
import { ResponseModel } from "../../model/response-model";
import { SafeHttp } from './../../app/app.safe-http';

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
    
    admin.ativo = true;
    
    admin.tipo = 1;

    return admin;

  }
  
  login(login: LoginModel): Promise<UsuarioModel>{
    
    return new Promise(resolve => {

      if (login.usuario === "admin" && login.senha === "admin"){
        
        return resolve(this.getAdmin());

      }

      this.safeHttp.get(`${ENDPOINT_API}/usuarios`, {params: {login: login.usuario}})
        .map(res => res.json())
          .subscribe(
            data => {
            
              data.forEach(element => {
                
                if (element.senha == login.senha){
                
                  return resolve(data);

                } 
                
              });

              return resolve(null);

            },
            err => this.safeHttp.notResponse()
          ).unsubscribe();

    });
        
  }

  getUsuarioLogado() : Promise<UsuarioModel>{

    return new Promise(resolve => {

      this.storage.get('usuarioLogado')
        .then(data => {

          if (Array.isArray(data)){
          
            resolve(data[0]);

          }else{

            resolve(data);

          }
        })
        .catch(() => {resolve(null)})
    })

  }  

  logout(): Promise<ResponseModel>{
    
    let response: ResponseModel;

    return new Promise(resolve => {
     
      this.storage.clear()
        .then(() => {

            response = {msg: 'Desconectado com sucesso', type: 1}
          
            resolve(response);

        })
        .catch(() => {
         
          response = {msg: 'Desculpe, ocorreu um erro ao desconectar. Tente nvamente.', type: 0}

          resolve(response);

        })
    });

  }

}
