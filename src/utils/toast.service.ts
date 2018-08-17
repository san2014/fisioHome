import { Injectable } from "@angular/core";

import { ToastController } from 'ionic-angular'
import { ToastPosition } from "../enum/toast-position.enum";

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController){}

    toastOnTop(msg: string, duration?: number){

        const time = duration ? duration : 3000;

        let toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: ToastPosition.ALTO
        });
        
        toast.present();        
    }

    toastOnMiddle(msg: string, duration?: number){

        const time = duration ? duration : 3000;

        let toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: ToastPosition.MEIO
        });
        
        toast.present();           

    }    

    toastOnBottom(msg: string, duration?: number){

        const time = duration ? duration : 3000;

        let toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: ToastPosition.BAIXO
        });
        
        toast.present();              

    }       

}