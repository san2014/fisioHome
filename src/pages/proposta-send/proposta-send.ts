import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { OneSignal } from '@ionic-native/onesignal';
import { OSNotificationPayload } from '@ionic-native/onesignal';
import { OSNotification } from '@ionic-native/onesignal';

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
    private oneSignal : OneSignal
  ){
      this.initialize();
  }

  initialize(){
    this.proposta = this.navParams.get('proposta');
    
    this.usuarioLogado = this.loginProvider.getUsuarioLogado();
  }

  async aceitar() {

    try{
    
      this.oneSignal.getIds()
        .then((next) => {
        
          let body = {
            tipo: "proposta",
            userId: this.proposta.profissional.id,
            msg: `O Paciente ${this.usuarioLogado.nome} solicita ${this.proposta.qtd} atendimentos do tipo ${this.proposta.tipoAtendimento.descricao}`
          }

          let notificationOBJ: any = {
            contents: {en: `Olá ${this.proposta.profissional.nome}! Tem uma nova solicitação de atendimento para você!`},
            include_player_ids: [this.proposta.profissional.onesignal_id],
            data: body
          };  
          
          this.oneSignal.postNotification(notificationOBJ)
            .then((res) => {
    
              this.presentToast("Por favor, aguarde a resposta do Profissional");
    
            })
            .catch((erro) => {
    
              alert(JSON.stringify(erro));
              
              throw new Error(erro);
              
            });

        });

    }catch(error){
    
      alert(JSON.stringify(error));
      //this.presentToast("Ocorreu um erro, por favor tente mais tarde...");

    }       
    
    //this.view.dismiss();

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
