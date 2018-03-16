import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {OneSignal, OSNotification, OSNotificationPayload} from "@ionic-native/onesignal";

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
    public oneSignal : OneSignal
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
      .then(()=> {
        if (platform.is('cordova')){
          this.prepareNotifications();
        }   
      })
      .then(() => {
        this.loginProvider.initTokenRequest();
      });

  }

  initialize(){
    this.usuario = new UsuarioModel();
    
  }

  prepareNotifications(){

    this.oneSignal.startInit("120907ba-b9de-4717-9395-38dd5a54b6b8", "214682051360");

    this.loginProvider.initOneSignalId();

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationOpened()
      .subscribe(data => { this.receivePush(data.notification.payload) });

    this.oneSignal.endInit();

  }

  receivePush(msg: OSNotificationPayload){

    let dialog : Alert;

    const msgJSON: any = msg.additionalData;

    const proposta: PropostaModel = msgJSON.proposta;

    if (msgJSON.tipo === "proposta"){

/*       dialog = this.alertCtrl.create({
        title: 'Nova Solicitação',
        message: msgJSON.msg,
        buttons: [
          {
            text: 'Recusar',
            handler: () => {
              this.recusarProposta(proposta);
            }
          },
          {
            text: 'Aceitar',
            handler: () => {
              this.aceitarProposta(proposta);
            }
          }
        ]
      });       */

      this.loginProvider.requestPermissionBadge();
      
      this.loginProvider.increaseBadge();

    }else if (msgJSON.tipo === "aceitaProposta"){

      dialog = this.alertCtrl.create({
        title: 'Confirmar Atendimento',
        message: msgJSON.msg,
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              alert('Solicitação cancelada...')
            }
          },
          {
            text: 'Aceitar',
            handler: () => {
              alert('Navegar para pagamento...')
            }
          }
        ]
      });        
       

    }else{

      dialog = this.alertCtrl.create({
        title: 'Atenção',
        message: msgJSON.msg,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });       

    }

    dialog.present();    

  }

  aceitarProposta(proposta: PropostaModel) {

    try{
    
      this.oneSignal.getIds()
        .then((next) => {
        
          let body = {
            tipo: "aceitaProposta",
            msg: `O Profissional ${proposta.profissional.nome} está disponível para lhe atender! Clique Ok para continuar`,
            proposta: proposta
          }

          let notificationOBJ: any = {
            contents: {en: `Olá! Encontramos um Fisioterapeuta para lhe atender!`},
            include_player_ids: [proposta.cliente.onesignal_id],
            data: body
          };  

          this.oneSignal.postNotification(notificationOBJ)
            .then((res) => {
    
              this.presentToast("Por favor, aguarde a resposta do Paciente");
    
            })
            .catch((erro) => {
    
              throw new Error(erro);
              
            });

        });

    }catch(error){
    
      this.presentToast("Ocorreu um erro, por favor tente mais tarde...");

    }       
    
  }  

  recusarProposta(proposta: PropostaModel) {

    try{
    
      this.oneSignal.getIds()
        .then((next) => {
        
          let body = {
            tipo: "recusaProposta",
            msg: `O Fisioterapeuta ${proposta.profissional.nome} encontra-se indisponível no momento, deseja fazer nova requisição? `
          }

          let notificationOBJ: any = {
            contents: {en: `Desculpe... Fisioterapeuta indisponível no momento!`},
            include_player_ids: [proposta.cliente.onesignal_id],
            data: body
          };  
          
          this.oneSignal.postNotification(notificationOBJ)
            .then((res) => {
    
              this.presentToast("Sua resposta foi enviada ao Paciente");
    
            })
            .catch((erro) => {
    
              throw new Error(erro);
              
            });

        });

    }catch(error){
    
      this.presentToast("Ocorreu um erro, por favor tente mais tarde...");

    }       
    
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

