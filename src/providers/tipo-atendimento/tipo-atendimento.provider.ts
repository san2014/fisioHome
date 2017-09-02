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

  tiposAtendimentos(): Promise<TipoAtendimentoModel>{
    
      return new Promise(resolve => {
 
       this.safeHttp.get(`${ENDPOINT_API}/tiposAtendimentos`).map(res => res.json())
          .subscribe(data => {
  
            resolve(data);
            
          }, err => this.safeHttp.notResponse());
  
      })
         
  }  
  

}
