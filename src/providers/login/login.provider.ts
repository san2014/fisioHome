import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UsuarioModel } from "../../model/usuario-model";
import { ENDPOINT_API } from "../../app/app-constantes";
import { LoginModel } from './../../model/login.model';

@Injectable()
export class LoginProvider {

  constructor(public http: Http) {}

  
    login(login: LoginModel): Promise<UsuarioModel>{
      
      return new Promise(resolve => {
  
        this.http.get(`${ENDPOINT_API}/usuarios`, {params: {q: login.usuario}})
          .map(res => res.json())
          .subscribe(data => {

            if (data !== 'undefined'){

              if (data.senha === login.senha){

                resolve(data);

              }

            }
  
            resolve(null);
            
          }, err => resolve(null));
  
      })
          
    }

}
