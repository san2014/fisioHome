import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ENDPOINT_API, CEP_API } from '../app/app-constantes';

import { NetworkService } from './network-service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SafeHttp {

    basepath: string = "/fsh_api";

    basePathCEP: string = CEP_API;

    constructor(
      private http: HttpClient,
      private networkService: NetworkService,
      private platform: Platform
    ) {
        if (this.platform.is('cordova')){
          this.basepath = ENDPOINT_API;
        } 
    }

    get(url: string, headers?: HttpHeaders): Observable<any> {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else { 
        let urlCall : string = this.basepath + url;
        return this.http.get<any>(urlCall);
      }
    }

    getCEP(url: string, headers?: HttpHeaders){
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else { 
        let urlCall : string = CEP_API + url;
        return this.http.get<any>(urlCall);
      }      
    }

    post(url: string, body: any, headers?: HttpHeaders): Observable<any> {
      if (this.networkService.noConnection()) {
        this.networkService.showNetworkAlert();
      } else {
        let urlCall : string = this.basepath + url;
        return this.http.post<any>(urlCall, body, {headers: headers});
      }
    }

    put(url: string, body: string, headers?: HttpHeaders) {
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