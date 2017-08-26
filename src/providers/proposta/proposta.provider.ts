import { ProfissionalModel } from './../../model/profissional-model';
import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ENDPOINT_API } from "../../app/app-constantes";


@Injectable()
export class PropostaProvider {

  constructor(public http: Http) {}

  findProfDisponiveis(tipo: TipoAtendimentoModel): Promise<ProfissionalModel>{
    
    return new Promise(resolve => {

      this.http.get(`${ENDPOINT_API}/profissionais`, 
        {params: {flagDisponivel: 1}})
        .map(res => res.json())
        .subscribe(data => {

          data.forEach(work => {
            work.especialidades.forEach(spec => {
              if (spec.id !== tipo.id){
                resolve(data);
              }                 
            });
          });

          resolve(null);
          
        }, err => resolve(null));

    });
        
  }  

}
