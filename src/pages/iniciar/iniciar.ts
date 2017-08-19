
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { TipoAtendimentoProvider } from "../../providers/tipo-atendimento/tipo-atendimento.provider";


@IonicPage()
@Component({
  selector: 'page-iniciar',
  templateUrl: 'iniciar.html',
})
export class IniciarPage {

  tpsAtds: TipoAtendimentoModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tpAtdProvider: TipoAtendimentoProvider
  ) {
  }

  ionViewDidLoad() {

    this.tpAtdProvider.usuarios()
      .then(data =>{

        this.tpsAtds = data;

      })

  }



}
