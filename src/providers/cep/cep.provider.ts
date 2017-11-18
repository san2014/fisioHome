import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class CepProvider {

  basepath:string = 'https://viacep.com.br/ws';

  constructor(
    private http: Http
  ) {
       
/*     if (this.platform.is('cordova')){
      this.basepath = 'https://viacep.com.br/ws';
    }  */

  }

  getAddressByCep(cep: string): Promise<any>{

    return new Promise( (resolve, reject) => {
      this.http.get(`${this.basepath}/${cep}/json/`)
        .map(response => response.json())
        .subscribe(address => {
          resolve(address);
        }, err => {
          reject('Erro');
        });
        
    })  

  }

}
