import { FshUtils } from './../../utils/fsh-util';
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
    private fshUtils: FshUtils,
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
                try{
                  resolve(data[0]);
                }catch(notFound){
                  resolve(null);
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

    params = this.fshUtils.convertAPIUser(params);

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
              reject('Erro');
            });
    })
  }  



}
