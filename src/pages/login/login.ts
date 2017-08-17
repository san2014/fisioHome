import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  login(){
    this.navCtrl.push('HometabPage');
  }

}
