import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { SafeHttp } from '../../utils/safe-http';

import { ProfissionalModel } from '../../model/profissional-model';
import { PropostaModel } from '../../model/proposta-model';

@Injectable()
export class PropostaProvider {

  constructor(public safeHttp: SafeHttp) {}

  findProfDisponiveis(idEspecialidade: number, cidade: string): Promise<Array<ProfissionalModel>>{
    
    return new Promise<Array<ProfissionalModel>>((resolve, reject) => {

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

  inserir(proposta: PropostaModel): Promise<PropostaModel> {

    return new Promise<PropostaModel>((resolve, reject) => {

      this.safeHttp.post('/proposta', proposta)
        .toPromise()
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((error) => {
            reject(error);
          });      

    });

  }

  obter(id: number) : Promise<PropostaModel> {

    return new Promise<PropostaModel>((resolve, reject) => {

      this.safeHttp.get(`/proposta/${id}`)
        .toPromise()
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((error) => {
            reject(error);
          });      

    });

  }

  atualizar(proposta: PropostaModel): Promise<PropostaModel> {

    return new Promise<PropostaModel>((resolve, reject) => {

      this.safeHttp.put(`/proposta/${proposta.id}`, JSON.stringify(proposta))
        .toPromise()
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((error) => {
            reject(error);
          });      

    });

  } 
  
  excluir(id: number): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.safeHttp.delete(`/proposta/${id}`)
        .toPromise()
          .then((resp) => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });      

    });    

  }

}
