import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';


@Injectable()
export class CepProvider {

  basepath:string = 'https://viacep.com.br/ws';

  constructor(
    private http: Http
  ) {}

  getAddressByCep(cep: string): Promise<any>{

    return new Promise( (resolve, reject) => {
      this.http.get(`${this.basepath}/${cep}/json/`)
        .map(response => response.json())
        .toPromise()
        .then(address => {
          resolve(address)
        })
        .catch(
          err => {reject('erro')}
        );
    });

  }

}
