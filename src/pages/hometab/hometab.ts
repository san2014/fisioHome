import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-hometab',
  templateUrl: 'hometab.html'
})
export class HometabPage {

  iniciarRoot = 'IniciarPage'
  sobreRoot = 'SobrePage'


  constructor(public navCtrl: NavController) {}

}
