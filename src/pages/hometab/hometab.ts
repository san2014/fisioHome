import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UsuarioModel } from './../../model/usuario-model';
import { IniciarPage } from '../iniciar/iniciar';
import { SobrePage } from '../sobre/sobre';

@IonicPage()
@Component({
  selector: 'page-hometab',
  templateUrl: 'hometab.html'
})
export class HometabPage {

  iniciarRoot = IniciarPage;
  
  sobreRoot = SobrePage;

  contatoRoot = SobrePage;

  usuarioLogado: UsuarioModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    
    this.usuarioLogado = this.navParams.get('usuarioLogado');
    
  }

}
