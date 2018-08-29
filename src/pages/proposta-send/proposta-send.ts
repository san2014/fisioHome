import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, Loading } from 'ionic-angular';

import { OneSignal } from '@ionic-native/onesignal';

import { PropostaModel } from '../../model/proposta-model';

import { ToastService } from '../../utils/toast.service';
import { LoadingService } from '../../utils/loading.service';

@IonicPage()
@Component({
  selector: 'page-proposta-send',
  templateUrl: 'proposta-send.html',
})
export class PropostaSendPage {

  proposta: PropostaModel;

  @Output()
  feedback = new EventEmitter<boolean>();

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    private oneSignal : OneSignal,
    private loadingService: LoadingService,
    private toastService: ToastService
  ){
    this.initialize();
  }

  initialize(){

    this.proposta = this.navParams.get('proposta');

  }

  async aceitar() {

    try{

      this.loadingService.show('aguarde...');

      let oneSignalIds = await this.oneSignal.getIds();

      let body = {
        tipo: "proposta",
        oneSignalId: this.proposta.cliente.onesignalId,
        msg: `O Paciente ${this.proposta.cliente.nome} 
        solicita ${this.proposta.qtd} atendimentos do tipo 
        ${this.proposta.tipoAtendimento.especialidade.descricao}`,
        proposta: this.proposta
      }

      let notificationOBJ: any = {
        contents: {en: `Tem uma nova solicitação de atendimento para você!`},
        include_player_ids: [this.proposta.profissional.usuario.onesignalId],
        data: body
      };        

      await this.oneSignal.postNotification(notificationOBJ);

      this.loadingService.hide();

      this.toastService.toastOnBottom('Solicitação enviada, por favor aguarde...');

      this.feedback.emit(true);

      this.view.dismiss();

    }catch(error){

      this.loadingService.hide();
    
      this.toastService.toastOnTop("Ocorreu um erro, por favor tente mais tarde...");

    }       
    
  }

  recusar(){
    
    this.feedback.emit(false);
    
    this.view.dismiss();

  }

  getValorPacote(){
    return this.proposta.qtd * this.proposta.tipoAtendimento.valor;
  }

}
