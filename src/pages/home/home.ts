import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login.provider';
import { UsuarioModel } from '../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  usuarioLogado: UsuarioModel;

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private loginProvider: LoginProvider,
    public navParams: NavParams,
    private loadingCtrl: LoadingController
  ) { }
  
  ionViewCanEnter(){

    this.initialize();

  }

  initialize(){

    this.showLoading('aguarde...');

    const usuarioCookie = this.loginProvider.getUsuarioLogado();

    if (usuarioCookie != undefined && usuarioCookie != null){
      
      this.usuarioLogado = usuarioCookie;

      this.handleHomePage();

    }     

    this.hideLoading();

  }

   
  login(){
    this.navCtrl.push('Login');
  }

  cadastreSe(){
    this.navCtrl.push('UserRegister');
  }

  handleHomePage(){
    this.navCtrl.push('HometabPage');
  }

  showLoading(msg: string){

    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();

  }

  hideLoading(){
    this.loading.dismiss();
  }  

}
