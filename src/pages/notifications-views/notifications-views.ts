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

  //notificacoes: Array<NotificacaoModel> = [];
  notificacoes: Array<NotificacaoModel>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificacaoProvider: NotificacaoProvider
  ) {
      this.initialize();
  }

  async initialize(){

    let clearNot = await this.notificacaoProvider.limparNotificacoes();

    let notSave = await this.notificacaoProvider.salvarNotificacaoSessao(new NotificacaoModel());

    this.notificacoes = await this.notificacaoProvider.getNotificacoes();
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsViewsPage');
  }

}
