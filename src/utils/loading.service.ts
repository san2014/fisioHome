import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

@Injectable()
export class LoadingService {

    loading: Loading

    constructor(public loadingCtrl: LoadingController){}

    async show(msg: string) {

        this.loading = this.loadingCtrl.create({
            content: msg
        });

        this.loading.present();        
    }

    hide(){
        this.loading.dismiss();
    }
}