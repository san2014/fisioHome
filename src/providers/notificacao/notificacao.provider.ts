import { UsuarioModel } from './../../model/usuario-model';
import { PropostaModel } from './../../model/proposta-model';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { NotificacaoModel } from './../../model/notificacao-model';
import { DetalheNotificacao } from '../../model/detalhe-notificacao-model';
import { ProfissionalModel } from '../../model/profissional-model';
import { LoginProvider } from '../login/login.provider';

@Injectable()
export class NotificacaoProvider {

  constructor(private storage: Storage, private loginProvider: LoginProvider) {
    this.initNotificacoes();
  }

  testNotifica(): Array<NotificacaoModel>{

    let notifyIns: NotificacaoModel = new NotificacaoModel();
    
    notifyIns.msg = "Notifcação de Teste";

    let detalhe: DetalheNotificacao = new DetalheNotificacao();

    detalhe.msg = "Notifcação de Teste";

    detalhe.tipo = "proposta";

    detalhe.oneSignalId = "c82acfa1-6c2f-45d4-b2fa-be45f261cc3d";

    let proposta: PropostaModel = new PropostaModel();

    proposta.dataInicio = new Date('17 October 2018 14:48 UTC');

    let profissional : ProfissionalModel = new ProfissionalModel();

    profissional.id = 684;
    profissional.nome = "Luana Costa";
    profissional.credenciamento = "11234-CFTO";
    profissional.vencimento = "18/08/2018";
    profissional.conta = "3456678";
    profissional.agencia =  "3467";
    profissional.flagDisponivel = 1;
    profissional.imgperfil = `https://scontent.fssa12-1.fna.fbcdn.net/v/t1.0-1/
      p160x160/26112133_1518383701608925_6429823499577017490_n.jpg?_nc_cat=0
      &oh=4c970e8de70896c21d77d515705703d0&oe=5B2A13DA`;
    profissional.onesignal_id = "c82acfa1-6c2f-45d4-b2fa-be45f261cc3d";

    proposta.profissional = profissional;

    let cliente : UsuarioModel = this.loginProvider.getUsuarioLogado();

    cliente.imgperfil = `https://scontent.fssa13-1.fna.fbcdn.net/v/t1.0-1/p160x160/15203273_1079078582204799_9114949728011796718_n.jpg?_nc_cat=0&oh=0e613d9c3c61978a6d0213418fb745aa&oe=5B60F9B5`;

    proposta.cliente = cliente;

    detalhe.proposta = proposta;

    notifyIns.dados = detalhe;

    let notificacoes : Array<NotificacaoModel> = [];

    notificacoes.push(notifyIns);

    return notificacoes;

  }

  async initNotificacoes(): Promise<boolean>{

    let callBack: boolean = false;

    await this.storage.get('notificacoes')
      .then((dados)=>{

          let aux: Array<NotificacaoModel> = dados;

          if (aux == null || aux.length == 0 ){
            //this.storage.set('notificacoes', new Array<NotificacaoModel>());
            this.storage.set('notificacoes', this.testNotifica());
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

    let notificacoes: Array<NotificacaoModel>;

    let callBack: boolean = false;

    await this.storage.get('notificacoes')
      .then((dados)=>{
        notificacoes = dados;
      });

    notificacoes.unshift(notificacao);

    await this.storage.set('notificacoes', notificacoes)
    .then(()=>{
      callBack = true;
    })   
    console.log(notificacoes);
    return callBack;

  }
  
  async limparNotificacoes(): Promise<boolean>{

    let callBack: boolean;

    await this.storage.set('notificacoes', new Array<NotificacaoModel>())
      .then(() => callBack = true);

    return callBack;

  }

}
