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
    private alert: AlertController,
  ) {
    this.initialize();
  }

  async initialize() {

    this.usuarioLogado = this.loginProvider.getUsuarioLogado();

    if (this.usuarioLogado !== undefined){

      await this.tpAtdProvider.tiposAtendimentos()
        .then(data =>{
          this.tpsAtds = data;
        })
        .catch(() => this.tpsAtds = [])
        
    }else{
      
      this.usuarioLogado = new UsuarioModel();

      this.showAlert("Ocorreu um erro inesperado, tente novamente mais tarde...")

    }

  }

  getNotifications(){
    this.loginProvider.qtdNotificacoes;
  }


  increaseBadge(){
    this.loginProvider.requestPermissionBadge();
    this.increaseBadge();
  }  

  initProposta(tipoAtendimento: TipoAtendimentoModel){
    this.navCtrl.push('PropostaInitPage', {'tipoAtendimento': tipoAtendimento});
  }

  showAlert(msg: string) {
    let networkAlert = this.alert.create({
      title: 'Atenção',
      message: msg,
      buttons: ['Ok']
    });
    
    networkAlert.present();
  }   
  
}
