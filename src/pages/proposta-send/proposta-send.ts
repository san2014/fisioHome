import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { PropostaModel } from './../../model/proposta-model';
import { LoginProvider } from '../../providers/login/login.provider';
import { UsuarioModel } from '../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-proposta-send',
  templateUrl: 'proposta-send.html',
})
export class PropostaSendPage {

  proposta: PropostaModel;
  usuarioLogado: UsuarioModel;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    private loginProvider: LoginProvider,
    private toastCtrl: ToastController,
  ){
      this.initialize();
  }

  initialize(){
    this.proposta = this.navParams.get('proposta');
    
    this.usuarioLogado = this.loginProvider.getUsuarioLogado();
  }

  aceitar(){

    window["plugins"].OneSignal.getIds(ids => {

      var body = {
        tipo: "prop",
        userId: this.proposta.profissional.id,
        msg: `O Paciente + ${this.usuarioLogado.nome} + solicita 
        ${this.proposta.qtd} atendimentos do tipo ${this.proposta.tipoAtendimento.descricao}`
      }

      var msg = { 
          contents: {
            en: body
          },
          include_player_ids: [this.proposta.profissional.onesignal_id]
      };

      window["plugins"].OneSignal.postNotification(msg,
        successResponse => {
          this.presentToast("Por favor, aguarde a resposta do Profissional");
          this.view.dismiss();
        },
        erro => {
          this.presentToast("Ocorreu um erro, por favor tente mais tarde...");
          this.view.dismiss();
        }
      );

    });


    
  }

  recusar(){
    this.view.dismiss();
  }

  getValorPacote(){
    return this.proposta.qtd * this.proposta.tipoAtendimento.valor;
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }   

}
