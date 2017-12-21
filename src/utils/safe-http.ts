import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ENDPOINT_API } from './../app/app-constantes';

import { NetworkService } from './network-service'

@Injectable()
export class SafeHttp {

    basepath: string = "/fsh_api";
  
    constructor(
      private http: HttpClient,
      private networkService: NetworkService,
      private platform: Platform) {
       
        if (this.platform.is('cordova')){
          this.basepath = ENDPOINT_API;
        }  
        this.basepath = ENDPOINT_API;

    }

    get(url: string) {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else { 
        return this.http.get<any>(this.basepath+url) 
      }
    }

    post(url: string, body: string) {
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