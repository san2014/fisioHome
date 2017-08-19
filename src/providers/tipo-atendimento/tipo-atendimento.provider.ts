import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENDPOINT_API } from "../../app/app-constantes";


@Injectable()
export class TipoAtendimentoProvider {

  constructor(public http: Http) {}

  usuarios(): Promise<TipoAtendimentoModel>{
    
      return new Promise(resolve => {
  
        this.http.get(`${ENDPOINT_API}/tiposAtendimentos`).map(res => res.json())
          .subscribe(data => {
  
            resolve(data);
            
          }, err => resolve(null));
  
      })
         
    }  
  

}
