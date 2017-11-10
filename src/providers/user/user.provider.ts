import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { UsuarioModel } from './../../model/usuario-model';
import { ENDPOINT_API } from "../../app/app-constantes";
import { SafeHttp } from './../../app/app.safe-http';

@Injectable()
export class UserProvider {

  constructor(
    public http: Http,
    private safeHttp: SafeHttp
  ) {}


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
  
  postData(params): Promise<UsuarioModel> {

    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise( (resolve, reject) => {
      this.http
        .post(`${ENDPOINT_API}/usuario`, 
          params, 
          new RequestOptions({headers: headers})
        )
        .map(response => response.json())
        .subscribe((data) =>{
          resolve(data);
        }, 
        error => ( reject('Erro no servidor')) )
      })
  }  

}
