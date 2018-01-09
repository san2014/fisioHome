import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioModel } from "../../model/usuario-model";
import { LoginProvider } from "../../providers/login/login.provider";

/**
 * Generated class for the ProfInfoRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prof-info-register',
  templateUrl: 'prof-info-register.html',
})
export class ProfInfoRegisterPage {

  usuario: UsuarioModel;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginProvider: LoginProvider
  ) {

      this.initialize();
  }

  initialize() {
    this.usuario = this.loginProvider.getUsuarioLogado();
  }

  continuar(){
    this.navCtrl.push('ProfRegisterPage');
  }  

  cancelar(){
    this.navCtrl.push('HometabPage');
  }

}
