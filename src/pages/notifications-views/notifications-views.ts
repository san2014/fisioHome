import { DetalheNotificacao } from './../../model/detalhe-notificacao-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificacaoModel } from './../../model/notificacao-model';

@IonicPage()
@Component({
  selector: 'page-notifications-views',
  templateUrl: 'notifications-views.html',
})
export class NotificationsViewsPage {

  notifications: Array<NotificacaoModel> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

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

      this.notifications.push(notificacao);
      console.log(this.notifications);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsViewsPage');
  }

}
