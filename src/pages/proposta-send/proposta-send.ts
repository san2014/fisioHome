import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfissionalModel } from './../../model/profissional-model';

@IonicPage()
@Component({
  selector: 'page-proposta-send',
  templateUrl: 'proposta-send.html',
})
export class PropostaSendPage {

  profissional: ProfissionalModel;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams
  ){
      this.initialize();
  }

  initialize(){
    this.profissional = this.navParams.get('profissional');
  }

}
