import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

@Injectable()
export class LoadingService {

    loading: Loading

    constructor(public loadingCtrl: LoadingController){}

    showDefault(msg: string) {

        this.loading = this.loadingCtrl.create({
            content: msg
        });

        this.loading.present();        
    }

    hideLoading(){
        this.loading.dismiss();
    }
}