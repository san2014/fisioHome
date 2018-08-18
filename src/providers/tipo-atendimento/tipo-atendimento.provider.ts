import { Especialidade } from './../../model/especialidade.model';
import { SafeHttp } from '../../utils/safe-http';
import { TipoAtendimentoModel } from '../../model/tipoatendimento-model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TipoAtendimentoProvider {

  constructor(
    private safeHttp: SafeHttp
  ) {}


  listar(): any[] {

    const tipo = {id: 1, nome: "TESTE"}

    return [tipo];

  }

  tiposAtendimentos(): Promise<TipoAtendimentoModel[]>{

    return new Promise((resolve, reject) => {
      this.safeHttp.get(`/tipoAtendimento`)
        .toPromise()
        .then(data => {
          resolve(data.data);
        })
        .catch(erro => {
          reject(erro);
        });
    });
         
  }  
  

}
