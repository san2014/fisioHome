import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TipoAtendimentoProvider {

  constructor() {}

  tiposAtendimentos(): Promise<TipoAtendimentoModel[]>{

    let list = [
      {
        "id": 1,
        "descricao": "Ortopedia",
        "valor": 55,
        "imgUrl": "assets/img/ortoped.png"
      },
      {
        "id": 2,
        "descricao": "Pediatria",
        "valor": 55,
        "imgUrl": "assets/img/pediatric.png"
      },
      {
        "id": 3,
        "descricao": "Neurologia",
        "valor": 65,
        "imgUrl": "assets/img/neuro.png"
      },
      {
        "id": 4,
        "descricao": "Geriataria",
        "valor": 55,
        "imgUrl": "assets/img/geriatric.png"
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
