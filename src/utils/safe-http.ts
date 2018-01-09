import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ENDPOINT_API } from './../app/app-constantes';

import { NetworkService } from './network-service'
import { LoginProvider } from '../providers/login/login.provider';
import { UserProvider } from '../providers/user/user.provider';

@Injectable()
export class SafeHttp {

    basepath: string = "/fsh_api";

    bodyToken: any = {'chave': '7ntEIOpemKb1RF7LIcbYVA7'};
  
    constructor(
      private http: HttpClient,
      private networkService: NetworkService,
      private platform: Platform,
      loginProvider: UserProvider
    ) {
       
        if (this.platform.is('cordova')){
          this.basepath = ENDPOINT_API;
        }  
        //this.basepath = ENDPOINT_API;

    }

    get(url: string) {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else { 
        return this.http.get<any>(this.basepath+url) 
      }
    }

    getToken(){
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else {
        return this.http.post<any>(`${this.basepath}/auth`, this.bodyToken);
      }
    }

    post(url: string, body: string) {
      
      let hearders = new HttpHeaders();
      //hearders.set('Authorizartion', `JWT ${this.loginProvider.getUsuarioLogado().tokenRequests}`)

      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else {
        return this.http.post<any>(`${this.basepath}${url}`, body) 
      }
    }

    put(url: string, body: string) {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else {
        return this.http.put<any>(`${this.basepath}${url}`, body) 
      }
    }    

    notResponse(){
        this.networkService.notResponse();
    }
  
}