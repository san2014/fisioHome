import { LoginProvider } from '../login/login.provider';
import { FshUtils } from '../../utils/fsh-util';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { OneSignal } from '@ionic-native/onesignal';

import { UsuarioModel } from '../../model/usuario-model';
import { SafeHttp } from '../../utils/safe-http';
import { ErrorHandler } from '../../app/app-error-handler';

@Injectable()
export class UserProvider {

  constructor(
    private safeHttp: SafeHttp,
    private fshUtils: FshUtils,
    private loginProvider: LoginProvider
  ) {}

  usuarios(): Promise<UsuarioModel>{
  
    return new Promise( (resolve, reject) => {
      this.safeHttp.get(`/usuario`)
        .map(res => res.json())
          .toPromise()
            .then(data => {
              resolve(data);
            })
            .catch(error => {
              ErrorHandler.handlerError(error);
            });
    })
       
  }

  getUserByEmail(email: string): Promise<UsuarioModel>{

    return new Promise( (resolve, reject) => {
      this.safeHttp.get(`/usuario/obterPorEmail/${email}`)
          .toPromise()
            .then(data => {
              resolve(data);
            })
            .catch(error => {
              ErrorHandler.handlerError(error);
            })
    });   

  }
  
  postData(params): Promise<any> {

    return new Promise( (resolve, reject) => {
      this.safeHttp
        .post(`/usuario`, params)
          .toPromise()
            .then((data) =>{
              resolve(data);
            })
            .catch(error => {
              reject(ErrorHandler.handlerError(error));
            });
    });

  } 
  
  update(params) : Promise<string>{

    return new Promise( (resolve, reject) => {
      this.safeHttp
        .put(`/usuario`, params)
          .toPromise()
            .then((data) =>{
              resolve(data.statusText);
            })
            .catch(error => {
              reject(ErrorHandler.handlerError(error));
            });
    });    

  }

}
