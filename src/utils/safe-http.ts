import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ENDPOINT_API, CEP_API } from './../app/app-constantes';

import { NetworkService } from './network-service'

@Injectable()
export class SafeHttp {

    basepath: string = "/fsh_api";

    basePathCEP: string = CEP_API;

    bodyToken: any = {'chave': '7ntEIOpemKb1RF7LIcbYVA7'};

    constructor(
      private http: HttpClient,
      private networkService: NetworkService,
      private platform: Platform,
      
    ) {
       
        if (this.platform.is('cordova')){
          this.basepath = ENDPOINT_API;
        } 
        
    }

    get(url: string, token: string) {
      
      if (this.networkService.noConnection()) {
        
        this.networkService.showNetworkAlert();

      } else { 
        
        let headers = new HttpHeaders();
      
        headers = headers.set('Authorization', `Bearer ${token}`);

        let urlCall : string = this.basepath + url;

        return this.http.get<any>(urlCall, {headers: headers});

      }

    }

    getCEP(url: string){

      if (this.networkService.noConnection()) {
        
        this.networkService.showNetworkAlert();

      } else { 

        let urlCall : string = CEP_API + url;
        
        return this.http.get<any>(urlCall);

      }      

    }

    getToken(){
      
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else {
        return this.http.post<any>(`${this.basepath}/auth`, this.bodyToken);
      }

    }

    post(url: string, body: any, token: string) {

      if (this.networkService.noConnection()) {

        this.networkService.showNetworkAlert();

      } else {
        
        let headers = new HttpHeaders();
      
        headers = headers.set('Authorization', `Bearer ${token}`);

        let urlCall : string = this.basepath + url;

        return this.http.post<any>(urlCall, body, {headers: headers});
        
      }

    }

    put(url: string, body: string, token: string) {
      
      if (this.networkService.noConnection()) {

        this.networkService.showNetworkAlert();
        
      } else {
        
        let urlCall : string = this.basepath + url;

        return this.http.put<any>(urlCall, body) 

      }

    }    

    notResponse(){
      this.networkService.notResponse();
    }
  
}