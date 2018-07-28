import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';         

import { FshUtils } from './../../utils/fsh-util';

import { PropostaProvider } from '../../providers/proposta/proposta.provider';         
import { LoginProvider } from '../../providers/login/login.provider';

import { TipoAtendimentoModel } from '../../model/tipoatendimento-model';
import { PropostaModel } from "../../model/proposta-model";
import { UsuarioModel } from '../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-proposta-init',
  templateUrl: 'proposta-init.html',
})
export class PropostaInitPage {

  tipoAtendimento: TipoAtendimentoModel;

  proposta: PropostaModel;

  usuarioLogado: UsuarioModel;

  formProposta: FormGroup;

  constructor(
    public navCtrl: NavController, 
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private propostaProvider: PropostaProvider,
    private loginProvider: LoginProvider,
    private fshUtils: FshUtils,
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
      ],
      'dtInicio': ['', Validators.required]
    });

    this.usuarioLogado = this.loginProvider.getUsuarioLogado();

    this.proposta = new PropostaModel();
    
    this.proposta.tipoAtendimento = this.tipoAtendimento;
    
    this.proposta.cliente = this.usuarioLogado;

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
    
    const cidade = this.usuarioLogado.cidade;
    
    const idEspecialidade = this.tipoAtendimento.especialidade.id;

    this.propostaProvider.findProfDisponiveis(idEspecialidade, cidade)
      .then((data) => {

        this.proposta.profissional = data;
        
        alert.dismiss();
        
        this.showProfModal()

      })
      .catch((erro) => {
        
        let msg = "Não localizamos nenhum profissional disponível no momento...tente mais tarde";
        
        this.fshUtils.showAlert("Desculpe", msg);

      });

  }

  showProfModal() {

    let profileModal = this.modalCtrl
      .create('PropostaSendPage', {'proposta': this.proposta});
    
    profileModal.present();

  }  

}
