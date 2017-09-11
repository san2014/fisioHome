import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { PropostaModel } from './../../model/proposta-model';

@IonicPage()
@Component({
  selector: 'page-proposta-send',
  templateUrl: 'proposta-send.html',
})
export class PropostaSendPage {

  proposta: PropostaModel;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
  ){
      this.initialize();
  }

  initialize(){
    this.proposta = this.navParams.get('proposta');
  }

  aceitar(){
    this.view.dismiss();
  }

  recusar(){
    this.view.dismiss();
  }

  getValorPacote(){
    return this.proposta.qtd * this.proposta.tipoAtendimento.valor;
  }

}
