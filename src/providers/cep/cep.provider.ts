import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SafeHttp } from '../../utils/safe-http';


@Injectable()
export class CepProvider {

  constructor(
    private safeHttp: SafeHttp
  ) {}

  getAddressByCep(cep: string): Promise<any>{

    return new Promise( (resolve, reject) => {
      this.safeHttp.getCEP(`/${cep}/json/`)
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
