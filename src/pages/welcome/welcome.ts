import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioModel } from './../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  usuario: UsuarioModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.initialize();
  }

  initialize() {
    this.usuario = this.navParams.get('usuarioModel');
    //this.usuario = {"id": 10, "sexo": 1,"cpf":82765760950,"rg":"12343444","nome":"Luana Costa","senha":"123456","email":"costa.luana@gmail.com","dt_nasc":"1973-03-10","cep":40430200,"cidade":"","logradouro":"Rua Almirante Tamandaré","bairro":"Vila Ruy Barbosa","numero_local":"59","onesignal_id":"","facebook_id": null,"google_id":null,"flag_ativo":true};
  }

  next(){
    this.navCtrl.push('UserPicturePage',{'usuario': this.usuario})
  }

}
