import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, Loading } from 'ionic-angular';

import { OneSignal } from '@ionic-native/onesignal';

import { PropostaModel } from '../../model/proposta-model';

@IonicPage()
@Component({
  selector: 'page-proposta-send',
  templateUrl: 'proposta-send.html',
})
export class PropostaSendPage {

  proposta: PropostaModel;

  loading: Loading;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    private toastCtrl: ToastController,
    private oneSignal : OneSignal,
    private loadingCtrl: LoadingController,
  ){
      this.initialize();
  }

  initialize(){
    this.proposta = this.navParams.get('proposta');
  }

  async aceitar() {

    try{

      this.showLoading('aguarde...');

      let oneSignalIds = await this.oneSignal.getIds();

      let body = {
        tipo: "proposta",
        oneSignalId: this.proposta.cliente.onesignalId,
        msg: `O Paciente ${this.proposta.cliente.nome} solicita ${this.proposta.qtd} atendimentos do tipo ${this.proposta.tipoAtendimento.descricao}`,
        proposta: this.proposta
      }

      let notificationOBJ: any = {
        contents: {en: `Tem uma nova solicitação de atendimento para você!`},
        include_player_ids: [this.proposta.profissional.onesignalId],
        data: body
      };        

      let postNotification = await this.oneSignal.postNotification(notificationOBJ);
      
      this.hideLoading();

      this.view.dismiss();

    }catch(error){

      this.hideLoading();
    
      this.presentToast("Ocorreu um erro, por favor tente mais tarde...");

      this.view.dismiss();

    }       
    
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

  showLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();     
  }

  hideLoading(){
    this.loading.dismiss();
  }  

}
