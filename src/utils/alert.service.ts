import { AlertController, Alert } from 'ionic-angular';
import { Injectable, Output, EventEmitter } from '@angular/core';

import { ToastService } from './toast.service';

@Injectable()
export class AlertService {

    @Output()
    callBack = new EventEmitter<boolean>();

    constructor(
        private alert: AlertController,
        private toast: ToastService
    ){}

    public simpleAlert(msg: string, titulo?: string) {

        titulo = titulo ? titulo : 'Alerta';

        let alert = this.alert.create({
            title: titulo,
            message: msg,
            buttons: [
                {text: 'Ok'}
            ]
        });
        
        alert.present();
    }   

    public async simpleBoolean(msg: string, titulo?: string){

        let alert = await this.alert.create({
            title: 'Logout',
            message: 'Deseja deslogar do nosso aplicativo?',
            buttons: [
              {
                text: 'Não',
                role: 'cancel',
                handler: () => {
                    this.callBack.emit(false);
                }                
              },
              {
                text: 'Sim',
                handler: () => {
                  this.callBack.emit(true);
                }
              }
            ]
        }); 

        alert.present();
        
    }
    
    public withToastMessage(
        title: string, msg: string, 
        toastMsg: string, labelButton?: string
    ): Alert {

        let alert = this.alert.create({
            title: title,
            message: msg,
            buttons: [
              {
                text: labelButton,
                handler: () => {
                  this.toast.toastOnBottom(toastMsg);
                }          
              }
            ]
          });  
          
        return alert;

    }

}