import { DetalheNotificacao } from './../../model/detalhe-notificacao-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificacaoModel } from './../../model/notificacao-model';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao.provider';

@IonicPage()
@Component({
  selector: 'page-notifications-views',
  templateUrl: 'notifications-views.html',
})
export class NotificationsViewsPage {

  notificacoes: Array<NotificacaoModel> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificacaoProvider: NotificacaoProvider
  ) {
      this.initialize();
  }

  async initialize(){

    this.notificacoes = await this.notificacaoProvider.getNotificacoes();

    console.log(this.notificacoes);
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsViewsPage');
  }

  async increase(){

    let notificacao: NotificacaoModel = new NotificacaoModel();

    let detalheNotificacao: DetalheNotificacao; 
    
    detalheNotificacao =  {
                            tipo: "proposta",
                            oneSignalId: "fdsfkjfkpe924024",
                            msg: `O Paciente solicita atendimentos`,
                            proposta: null  
                          };  

    notificacao.msg = "Tem mensagem pra você";
    
    notificacao.dados = detalheNotificacao;
    
    let callBack = await this.notificacaoProvider.salvarNotificacaoSessao(notificacao);   
    
    if (callBack){
      this.notificacoes.push(notificacao);
    }

  }

}
