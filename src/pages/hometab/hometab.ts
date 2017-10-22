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

  iniciarRoot: string = 'IniciarPage';
  
  sobreRoot: string = 'SobrePage';

  contatoRoot: string = 'SobrePage';

  usuarioLogado: UsuarioModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    
    this.usuarioLogado = this.navParams.get('usuarioLogado');
    
  }

}
