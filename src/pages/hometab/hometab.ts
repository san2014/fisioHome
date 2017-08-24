import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UsuarioModel } from './../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-hometab',
  templateUrl: 'hometab.html'
})
export class HometabPage {

  iniciarRoot = 'IniciarPage';
  
  sobreRoot = 'SobrePage';

  usuarioModel: UsuarioModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    
    this.usuarioModel = this.navParams.get('usuarioModel');
    
  }

}
