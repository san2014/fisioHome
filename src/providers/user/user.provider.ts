import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { UsuarioModel } from './../../model/usuario-model';
import { ENDPOINT_API } from "../../app/app-constantes";
import { SafeHttp } from './../../app/app.safe-http';

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
  
    return new Promise(resolve => {

      this.safeHttp.get(`${ENDPOINT_API}/usuario`).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(null);
          this.safeHttp.notResponse();
        });

    })
       
  }

  getUserByEmail(email: string): Promise<UsuarioModel>{

    return new Promise(resolve => {
      
      this.safeHttp.get(`${ENDPOINT_API}/usuario/email`).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(null);
        });

    })    

  }
  
  postData(params): Promise<string> {

    const headers = new Headers();
    
    headers.append('Content-Type', 'application/json');

    return new Promise( resolve => {
      this.http
        .post(`${this.basepath}/usuario`, 
          params, 
          new RequestOptions({headers: headers})
        )
        //.map(response => response.json())
        .subscribe((data) =>{
          //console.log(data);
          resolve(data.statusText);
        }, 
        error => ( console.log(error))
        )
      })
  }  

}
