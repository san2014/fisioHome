import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { UsuarioModel } from './../../model/usuario-model';
import { ENDPOINT_API } from "../../app/app-constantes";


@Injectable()
export class UserProvider {

  constructor(public http: Http) {}


  usuarios(documento: any): Promise<UsuarioModel>{
  
    return new Promise(resolve => {

      this.http.get(`${ENDPOINT_API}/usuarios`).map(res => res.json())
        .subscribe(data => {

          resolve(data);
          
        }, err => resolve(null));

    })
       
  }
  
  postData(params) {
    
    const headers = new Headers();

    headers.append('Content-type', 'application/json');

    return this.http
      .post(`${ENDPOINT_API}/usuarios`, 
        params, 
        new RequestOptions({headers: headers})
      )
      .map(response => response.json());
}  

}
