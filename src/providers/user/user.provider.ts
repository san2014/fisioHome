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

      this.safeHttp.get(`${ENDPOINT_API}/usuarios`).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(null);
          this.safeHttp.notResponse();
        });

    })
       
  }
  
  postData(params) {
    
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .post(`${ENDPOINT_API}/usuarios`, 
        params, 
        new RequestOptions({headers: headers})
      )
      .map(response => response.json());
}  

}
