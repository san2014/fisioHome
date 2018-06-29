import { LoginProvider } from './../login/login.provider';
import { FshUtils } from './../../utils/fsh-util';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { OneSignal } from '@ionic-native/onesignal';

import { UsuarioModel } from './../../model/usuario-model';
import { SafeHttp } from './../../utils/safe-http';

@Injectable()
export class UserProvider {

  constructor(
    private safeHttp: SafeHttp,
    private fshUtils: FshUtils,
    private platform: Platform,
    private loginProvider: LoginProvider
  ) {}

  usuarios(): Promise<UsuarioModel>{
  
    return new Promise( (resolve, reject) => {
      this.safeHttp.get(`/usuario`, this.loginProvider.getAccessToken())
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
      this.safeHttp.get(`/usuario/search/email=${email}`, this.loginProvider.getAccessToken())
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
                reject('Erro ao obter usuario por email'); 
            })
    })    

  }
  
  postData(params): Promise<any> {

    return new Promise( (resolve, reject) => {
      this.safeHttp
        .post(`/usuario`, params, this.loginProvider.getAccessToken())
          .toPromise()
            .then((data) =>{
              resolve(data);
            })
            .catch(error => {
              reject('Erro');
            });
    });

  } 
  
  update(params) : Promise<string>{

    return new Promise( (resolve, reject) => {
      this.safeHttp
        .put(`/usuario`, params, this.loginProvider.getAccessToken())
          .toPromise()
            .then((data) =>{
              resolve(data.statusText);
            })
            .catch(error => {
              reject('Erro');
            });
    });    

  }

}
