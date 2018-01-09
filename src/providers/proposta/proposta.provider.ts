import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';

@Injectable()
export class PropostaProvider {

  constructor(public http: Http) {}

  findProfDisponiveis(tipo: TipoAtendimentoModel): Promise<any>{


    let list =[
      {
        "usuario": {
          "id": "3",
          "nome": "Luana Costa"
        },
        "credenciamento": "11234-CFTO",
        "vencimento": "18/08/2018",
        "conta": "3456678",
        "agencia": "3467",
        "banco": "Caixa Economica Federal",
        "flagDisponivel": "1",  
        "especialidades" : [
          {"id": "2", "descricao" :"Pediatria"},
          {"id": "3", "descricao" :"Neurologia"}
        ],
        "oneSignalId": "c82acfa1-6c2f-45d4-b2fa-be45f261cc3d"
      }
    ];
    
    return new Promise(resolve => {
      resolve(list);
    });
    
/*     return new Promise(resolve => {

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

    }); */
        
  }  

}
