import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { NotificacaoModel } from './../../model/notificacao-model';
import { DetalheNotificacao } from '../../model/detalhe-notificacao-model';

@Injectable()
export class NotificacaoProvider {

  constructor(private storage: Storage) {
    console.log('Hello NotificacaoProvider Provider');
  }

  async initNotificacoes(): Promise<boolean>{

    let callBack: boolean = false;

    await this.storage.get('notificacoes')
      .then((dados)=>{

          if (dados == null){
            this.storage.set('notificacoes', new Array<NotificacaoModel>());
          }
          
          callBack = true;
      }); 

    return callBack;

  } 
  
  public getNotificacoes(): Promise<Array<NotificacaoModel>>{

    return new Promise((resolve, reject) => {
      this.storage.get('notificacoes')
        .then((dados)=> {
          resolve(dados);
        })
        .catch((error)=> {
          reject(error);
        })
    });

  }

  async salvarNotificacaoSessao(notificacao: NotificacaoModel): Promise<boolean>{

/*     let detalheNotificacao: DetalheNotificacao; 
    
    detalheNotificacao =  {
                            tipo: "proposta",
                            oneSignalId: "fdsfkjfkpe924024",
                            msg: `O Paciente solicita atendimentos`,
                            proposta: null  
                          };  

    notificacao.msg = "Tem mensagem pra você";
    
    notificacao.dados = detalheNotificacao;     */

    let notificacoes: Array<NotificacaoModel>;

    let callBack: boolean = false;

    await this.storage.get('notificacoes')
      .then((dados)=>{
        notificacoes = dados;
      });

    notificacoes.unshift(notificacao);

    this.storage.set('notificacoes', notificacoes)
    .then(()=>{
      callBack = true;
    })    

    return callBack;

  }
  
  async limparNotificacoes(): Promise<boolean>{

    let callBack: boolean;

    await this.storage.set('notificacoes', new Array<NotificacaoModel>())
      .then(() => callBack = true);

    return callBack;

  }

}
