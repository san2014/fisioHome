import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UsuarioModel } from './../../model/usuario-model';
import { ENDPOINT_API } from "../../app/app-constantes";
import { SafeHttp } from './../../utils/safe-http';

@Injectable()
export class UserProvider {

  basepath: string = "/fsh_api";

  constructor(
    public http: Http,
    private safeHttp: SafeHttp,
    private platform: Platform
  ) {
    if (this.platform.is('cordova')){
      this.basepath = ENDPOINT_API;
    }        
  }

  usuarios(): Promise<UsuarioModel>{
  
    return new Promise( (resolve, reject) => {
      this.safeHttp.get(`${this.basepath}/usuario`)
        .map(res => res.json())
          .toPromise()
            .then(data => {
              resolve(data);
            })
            .catch(
              err => {
                reject('Erro');
            });
    })
       
  }

  getUserByEmail(email: string): Promise<UsuarioModel>{

    return new Promise( (resolve, reject) => {
      this.safeHttp.get(`/usuario/search/email=${email}`)
        .map(res => res.json())
          .toPromise()
            .then(data => {
              if(data.lenght == undefined){
                reject('Not found records');
              }else{
                resolve(data);
              }
            })
            .catch(err => {
                reject('Erro'); 
            })
    })    

  }
  
  postData(params): Promise<string> {

    const headers = new Headers();
    
    headers.append('Content-Type', 'application/json');

    return new Promise( (resolve, reject) => {
      this.safeHttp
        .post(`/usuario`, 
          params, 
          new RequestOptions({headers: headers}))
          .toPromise()
            .then((data) =>{
              resolve(data.statusText);
            })
            .catch(error => {
              reject('Erro')
            });
    })
  }  

  convertUserAPI(api_user: any): UsuarioModel{

    console.log(api_user);

    let usuarioModel = new UsuarioModel();

    usuarioModel.id = api_user.usua_id;
    usuarioModel.bairro = api_user.usua_bairro;
    usuarioModel.nome = api_user.usua_nome;
    usuarioModel.cpf = api_user.usua_cpf;
    usuarioModel.rg = api_user.usua_rg;
    usuarioModel.email = api_user.usua_email;
    usuarioModel.cep = api_user.usua_cep;
    usuarioModel.dt_nasc = api_user.usua_dt_nasc;
    usuarioModel.numero_local = api_user.numero_local;

    return usuarioModel;

  }

}
