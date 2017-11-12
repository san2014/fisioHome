import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Subscription } from "rxjs/Subscription";


@Injectable()
export class NetworkService {

  checkConected: Subscription;
  checkDesconected: Subscription;
  conected: boolean = true;

  constructor(
      private network: Network,
      private alert: AlertController
    ) {

    this.checkConected = this.network.onConnect().subscribe(() => {
        console.log('conected');
        this.conected = true}); 

    this.checkDesconected = this.network.onDisconnect().subscribe(() => {
        console.log('disconected');
        this.conected = false});        

  }

  noConnection(): boolean {
    return !this.conected;
  }

  showNetworkInfo() {

    const speed = this.network.downlinkMax;
    
    let networkAlert = this.alert.create({
      title: 'Conectado a Internet',
      message: this.network.type + ' - ' + speed,
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }
      ]
    });
    
    networkAlert.present();

  }    

  showNetworkAlert() {

    let networkAlert = this.alert.create({
      title: 'Sem conexão com a internet',
      message: 'Por favor verifique sua conexão',
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }
      ]
    });
    
    networkAlert.present();

  }  

  notResponse() {
    
    let networkAlert = this.alert.create({
        title: 'Desculpe',
        message: 'O servidor não está respondendo, tente novamente mais tarde...',
        buttons: [
        {
            text: 'Ok',
            handler: () => {}
        },
        ]
    }); 

    networkAlert.present();
  }  

}