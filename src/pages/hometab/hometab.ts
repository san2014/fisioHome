import { LoginProvider } from '../../providers/login/login.provider';
import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UsuarioModel } from '../../model/usuario-model';

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
    public navParams: NavParams,
    private loginProvider: LoginProvider
  ) {
    
    this.initialize();
    
  }

  initialize(){

    this.usuarioLogado = this.loginProvider.getUsuarioLogado();
    
    if (this.usuarioLogado == null){
      this.navCtrl.push('Login');
    }
    
  }

  ionViewDidEnter(){
    this.initialize();
  }

}
