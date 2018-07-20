import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioModel } from '../../model/usuario-model';

import { LoginProvider } from '../../providers/login/login.provider';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  usuario: UsuarioModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loginProvider: LoginProvider
  ) {
      this.initialize();
  }

  initialize() {
    this.usuario = this.loginProvider.getUsuarioLogado();
    console.log(this.usuario);
  }

  next(){
    this.navCtrl.push('UserPicturePage',{'usuario': this.usuario})
  }

}
