import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioModel } from './../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  usuario: UsuarioModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.usuario = this.navParams.get('usuarioModel');
    this.usuario = new UsuarioModel();

  }

  ionViewDidLoad() {}

  next(){
    this.navCtrl.push('HometabPage',{'usuarioModel': this.usuario})
  }

}
