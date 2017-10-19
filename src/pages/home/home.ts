
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HometabPage } from './../hometab/hometab';
import { LoginProvider } from './../../providers/login/login.provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private loginProvider: LoginProvider,
    public navParams: NavParams) {
      
      this.initialize();

  }

  initialize(){
    
    this.loginProvider.getUsuarioLogado()
      .then((usuarioLogado) => {
        if (usuarioLogado !== null){
          this.navCtrl.push(HometabPage, {'usuarioLogado': usuarioLogado});
        }  
      });
  }

  login(){
    this.navCtrl.push('Login');
  }

  cadastreSe(){
    this.navCtrl.push('UserRegister');
  }

}
