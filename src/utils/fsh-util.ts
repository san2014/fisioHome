import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class FshUtils{

    loading: Loading

    constructor(
        private loadingCtrl: LoadingController,
        private alert: AlertController
    ){}
    
    showLoading(msg: string){

        this.loading = this.loadingCtrl.create({
            content: msg
        });
        this.loading.present();  

    }

    hideLoading(){
        this.loading.dismiss();
    }
    
    showAlert(titulo: string, msg: string) {

        let alert = this.alert.create({
            title: titulo,
            message: msg,
            buttons: [
                {text: 'Ok'}
            ]
        });
        
        alert.present();

    }     
    
    
}