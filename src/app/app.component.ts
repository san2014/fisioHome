import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoginProvider } from './../providers/login/login.provider';
import { UsuarioModel } from "../model/usuario-model";
import { PropostaModel } from './../model/proposta-model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: string = 'HomePage';

  @ViewChild(Nav) nav: Nav;

  menuSections: Array<{title: string, component: any}>

  usuario: UsuarioModel;
  
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loginProvider: LoginProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    ) {

      this.initialize();

      platform.ready().then(() => {

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        statusBar.backgroundColorByHexString('#236B8E');

        this.menuSections = [
          {title: 'Dados Cadastrais', component: 'UserRegister' },
          {title: 'Meu Histórico', component: 'IniciarPage'},
          {title: 'Avalie-nos', component: 'IniciarPage'},
        ];

      })
      .then(() => {
        this.loginProvider.initTokenRequest();
      });

  }

  initialize(){
    this.usuario = new UsuarioModel();
    
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  } 
  
  deslogar() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Deseja deslogar do nosso aplicativo?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }  

  navToComponent(component: any){
    this.nav.push(component); 
  }

  logout(){
    this.loginProvider.logout()
      .then((response)=> {
        this.presentToast(response.msg);
        this.navToComponent("HomePage");
      }).catch((erro) => {
        this.presentToast(erro.msg);
      })
  }

  pushRegister(){
    this.navToComponent("ProfInfoRegisterPage");
  }

}

