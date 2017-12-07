import { Http, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ENDPOINT_API } from './../app/app-constantes';

import { NetworkService } from './network-service'

@Injectable()
export class SafeHttp {

    basepath: string = "/fsh_api";
  
    constructor(
      private http: Http,
      private networkService: NetworkService,
      private platform: Platform) {
       
        if (this.platform.is('cordova')){
          this.basepath = ENDPOINT_API;
        }     
    }

    get(url: string, options?: RequestOptionsArgs) {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else { 
        return this.http.get(this.basepath+url, options) 
      }
    }

    post(url: string, body: string, options?: RequestOptionsArgs) {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else {
        return this.http.post(`${this.basepath}${url}`, body, options) 
      }
    }

    notResponse(){
        this.networkService.notResponse();
    }
  
}