import { NetworkService } from './../../app/app.network-service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UsuarioModel } from './../../model/usuario-model';
import { LoginProvider } from './../../providers/login/login.provider';
import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { TipoAtendimentoProvider } from "../../providers/tipo-atendimento/tipo-atendimento.provider";


@IonicPage()
@Component({
  selector: 'page-iniciar',
  templateUrl: 'iniciar.html',
})
export class IniciarPage {

  tpsAtds: TipoAtendimentoModel[];
  
  usuarioLogado: UsuarioModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tpAtdProvider: TipoAtendimentoProvider,
    private loginProvider: LoginProvider,
    private networkService: NetworkService,
    private alert: AlertController
  ) {
    this.initialize();
  }

  initialize() {
    this.usuarioLogado = new UsuarioModel();

    this.loginProvider.getUsuarioLogado()
      .then((user) => {
        this.usuarioLogado = user;
        
        this.tpAtdProvider.tiposAtendimentos()
          .then(data =>{
            this.tpsAtds = data;
          })
          .catch(() => this.tpsAtds = [])
      })
      .catch((error) => this.showAlert("Ocorreu um erro inesperado"));
  }

  initProposta(tipoAtendimento: TipoAtendimentoModel){
    this.navCtrl.push('PropostaInitPage', {'tipoAtendimento': tipoAtendimento});
  }

  showAlert(msg: string) {
    let networkAlert = this.alert.create({
      title: 'Conectado a Internet',
      message: msg,
      buttons: ['Dismiss']
    });
    
    networkAlert.present();
  }   
  
}
