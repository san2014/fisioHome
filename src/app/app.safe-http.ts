import { NetworkService } from './app.network-service';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SafeHttp {
  
    constructor(
      private http: Http,
      private networkService: NetworkService) {
  }

  get(url: string, options?: RequestOptionsArgs) {
    console.log(this.networkService.noConnection());
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
    } else { return this.http.get(url, options) }
  }


  post(url: string, body: string, options?: RequestOptionsArgs) {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
    } else { return this.http.post(url, body, options) }
  }

  notResponse(){
      this.networkService.notResponse();
  }
  
}