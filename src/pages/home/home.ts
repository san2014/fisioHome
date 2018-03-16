import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';

import { LoginProvider } from './../../providers/login/login.provider';
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
  ) {
      
      this.initialize();

  }

  initialize(){

    this.showLoading('aguarde...');

     this.loginProvider.getUsuarioSessao()
      .then((usuarioLogado) => {

        this.hideLoading();
        
        if (usuarioLogado !== null){
          
          this.usuarioLogado = usuarioLogado;
          
          this.handleHomePage();
          
        }  

      }).catch(()=> this.hideLoading()); 
    
  }

  ionViewDidEnter(){

    if (this.usuarioLogado !== null){
      this.handleHomePage();
    } 
    
  }
   
  login(){
    this.navCtrl.push('Login');
  }

  cadastreSe(){
    this.navCtrl.push('UserRegister');
  }

  handleHomePage(){
    
    this.navCtrl.push('HometabPage', {'usuarioLogado': this.usuarioLogado});
    
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
