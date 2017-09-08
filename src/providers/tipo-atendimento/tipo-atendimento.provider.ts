import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENDPOINT_API } from "../../app/app-constantes";
import { SafeHttp } from './../../app/app.safe-http';

@Injectable()
export class TipoAtendimentoProvider {

  constructor(
    public http: Http,
    private safeHttp: SafeHttp
  ) {}

  tiposAtendimentos(): Promise<TipoAtendimentoModel[]>{

    let list = [
      {
        "id": 1,
        "descricao": "Ortopedia",
        "valor": 55
      },
      {
        "id": 2,
        "descricao": "Pediatria",
        "valor": 55
      },
      {
        "id": 3,
        "descricao": "Neurologia",
        "valor": 65
      },
      {
        "id": 4,
        "descricao": "Geriataria",
        "valor": 55
      }
    ];
    
    return new Promise((resolve, reject) => {resolve(list)});
    
/*       return new Promise((resolve, reject) => {
 
       this.safeHttp.get(`${ENDPOINT_API}/tiposAtendimentos`).map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, err => {
            this.safeHttp.notResponse();
            reject();
          });
  
      }) */
         
  }  
  

}
