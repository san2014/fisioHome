import { StorageProvider } from './../storage/storage.provider';
import { UsuarioModel } from '../../model/usuario-model';
import { PropostaModel } from '../../model/proposta-model';
import { Injectable } from '@angular/core';

import { NotificacaoModel } from '../../model/notificacao-model';
import { DetalheNotificacao } from '../../model/detalhe-notificacao-model';
import { ProfissionalModel } from '../../model/profissional-model';
import { LoginProvider } from '../login/login.provider';

import { OneSignal } from '@ionic-native/onesignal';

@Injectable()
export class NotificacaoProvider {

  constructor(
    private storage: StorageProvider,
    public oneSignal : OneSignal,
    private loginProvider: LoginProvider){
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
    profissional.usuario.nome = "Luana Costa";
    profissional.credenciamento = "11234-CFTO";
    profissional.vencimento = "18/08/2018";
    profissional.conta = "3456678";
    profissional.agencia =  "3467";
    profissional.flagDisponivel = 1;
    profissional.usuario.imgPerfil = `https://scontent.fssa12-1.fna.fbcdn.net/v/t1.0-1/
      p160x160/26112133_1518383701608925_6429823499577017490_n.jpg?_nc_cat=0
      &oh=4c970e8de70896c21d77d515705703d0&oe=5B2A13DA`;
    profissional.usuario.onesignalId = "c82acfa1-6c2f-45d4-b2fa-be45f261cc3d";

    proposta.profissional = profissional;

    let cliente : UsuarioModel = this.loginProvider.getUsuarioLogado();

    cliente.imgPerfil = `https://scontent.fssa13-1.fna.fbcdn.net/v/t1.0-1/p160x160/15203273_1079078582204799_9114949728011796718_n.jpg?_nc_cat=0&oh=0e613d9c3c61978a6d0213418fb745aa&oe=5B60F9B5`;

    proposta.cliente = cliente;

    detalhe.proposta = proposta;

    notifyIns.dados = detalhe;

    let notificacoes : Array<NotificacaoModel> = [];

    notificacoes.push(notifyIns);

    return notificacoes;

  }

  salvarNotificacaoSessao(notificacao: NotificacaoModel){

    let notificacoes: Array<NotificacaoModel>;

    notificacoes = this.storage.getNotificacoes();

    notificacoes.unshift(notificacao);

    this.storage.setNotificacoes(notificacoes);

  }

  getNotificacoes(): Array<NotificacaoModel>{
    return this.storage.getNotificacoes();
  }
  
  public limparNotificacoes(){
    this.storage.clearNotificacoes();
  }

}
