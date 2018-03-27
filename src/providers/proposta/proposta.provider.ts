import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { SafeHttp } from '../../utils/safe-http';

import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';

@Injectable()
export class PropostaProvider {

  constructor(public safeHttp: SafeHttp) {}

  findProfDisponiveis(tipo: TipoAtendimentoModel): Promise<any>{


    let list =[
      {
        "id": "684",
        "nome": "Luana Costa",
        "credenciamento": "11234-CFTO",
        "vencimento": "18/08/2018",
        "conta": "3456678",
        "agencia": "3467",
        "banco": "Caixa Economica Federal",
        "flagDisponivel": "1", 
        "imgperfil": "https://scontent.fssa12-1.fna.fbcdn.net/v/t1.0-1/p160x160/26112133_1518383701608925_6429823499577017490_n.jpg?_nc_cat=0&oh=4c970e8de70896c21d77d515705703d0&oe=5B2A13DA",
        "especialidades" : [
          {"id": "2", "descricao" :"Pediatria"},
          {"id": "3", "descricao" :"Neurologia"}
        ],
        "onesignal_id": "c82acfa1-6c2f-45d4-b2fa-be45f261cc3d"
        //"onesignal_id": "4185dc34-d33f-48a4-bd13-092266a8c6d9"
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
