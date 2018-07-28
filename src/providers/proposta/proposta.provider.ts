import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { SafeHttp } from '../../utils/safe-http';

import { TipoAtendimentoModel } from '../../model/tipoatendimento-model';
import { ProfissionalModel } from '../../model/profissional-model';

@Injectable()
export class PropostaProvider {

  constructor(public safeHttp: SafeHttp) {}

  findProfDisponiveis(idEspecialidade: number, cidade: string): Promise<ProfissionalModel>{
    
    return new Promise<ProfissionalModel>((resolve, reject) => {

      this.safeHttp.get(`/profissional/disponiveisEspecialidade/${idEspecialidade}/${cidade}`)
        .toPromise()
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((error) => {
            reject(error);
          });

    });

  }  

}
