import { PropostaSendPage } from './../proposta-send/proposta-send';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,
         ToastController, ModalController } from 'ionic-angular';

import { PropostaModel } from "../../model/proposta-model";
import { PropostaProvider } from './../../providers/proposta/proposta.provider';

@IonicPage()
@Component({
  selector: 'page-proposta-init',
  templateUrl: 'proposta-init.html',
})
export class PropostaInitPage {

  tipoAtendimento: TipoAtendimentoModel;

  proposta: PropostaModel;

  formProposta: FormGroup;

  constructor(
    public navCtrl: NavController, 
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private propostaProvider: PropostaProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ){
    this.initialize();
  }

  initialize(){
    this.tipoAtendimento = this.navParams.get('tipoAtendimento');

    this.formProposta = this.fb.group({
      'qtd': ['', Validators.compose
        (
          [
            Validators.required, 
            Validators.maxLength(3)
          ]
        )
      ]
    });

    this.proposta = new PropostaModel();
    this.tipoAtendimento = new TipoAtendimentoModel();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {});
  
    toast.present();
  }   

  aplicaCssErro(campo: string) {
    return {
      'box-register-error': this.hasError(campo),
      'box-register': this.hasSuccess(campo) || this.notUsed(campo)
    };
  }   

  notUsed(campo){
    return this.formProposta.get(campo).pristine;
  }  

  hasSuccess(campo): boolean{
    return this.formProposta.get(campo).valid;
  }  
  
  hasError(campo): boolean{
    return (
      !this.formProposta.get(campo).valid &&
      (this.formProposta.get(campo).touched || this.formProposta.get(campo).dirty)
    );
  }  

  request(){
    let alert = this.alertCtrl.create({
      title: 'Pesquisando',
      message: `requisitando profissional para ${this.proposta.qtd} atendimentos...`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.presentToast('Busca cancelada...');
          }          
        }
      ]
    });

    alert.present(); 
    
    this.findProfDisponiveis(alert);
  }

  findProfDisponiveis(alert){
    this.propostaProvider.findProfDisponiveis(this.tipoAtendimento)
      .then((data) => {
        this.proposta.profissional = data[0];
        alert.dismiss();
        this.showProfModal()
      });
  }

  showProfModal() {
    let profileModal = this.modalCtrl
      .create('PropostaSendPage', {'profissional': this.proposta.profissional});
    
    profileModal.present();
  }  

}
