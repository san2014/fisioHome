import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';         
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { ToastService } from './../../utils/toast.service';
import { AlertService } from '../../utils/alert.service';

import { PropostaProvider } from '../../providers/proposta/proposta.provider';         
import { LoginProvider } from '../../providers/login/login.provider';

import { ProfissionalModel } from './../../model/profissional-model';
import { TipoAtendimentoModel } from '../../model/tipoatendimento-model';
import { PropostaModel } from "../../model/proposta-model";
import { UsuarioModel } from '../../model/usuario-model';

import { FormBase } from '../../shared/form-base';

@IonicPage()
@Component({
  selector: 'page-proposta-init',
  templateUrl: 'proposta-init.html',
})
export class PropostaInitPage extends FormBase {

  tipoAtendimento: TipoAtendimentoModel;

  proposta: PropostaModel;

  usuarioLogado: UsuarioModel;

  //formProposta: FormGroup;

  listaProfissionais: ProfissionalModel[] = [];

  constructor(
    public navCtrl: NavController, 
    private fb: FormBuilder,
    private propostaProvider: PropostaProvider,
    private loginProvider: LoginProvider,
    private toastService: ToastService,
    private alertService: AlertService,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ){
    super();
    this.initialize();
  }

  initialize(){
    this.tipoAtendimento = this.navParams.get('tipoAtendimento');
    
    this.formulario = this.fb.group({
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

  checkFeedback(event) {

    if(event === true){

      let msg = "Sua solicitação foi encaminhada...";

      this.toastService.toastOnMiddle(msg);

    }else if (event === false){

      if (this.listaProfissionais.length > 1) {
        
        this.listaProfissionais.slice(0, 0);
        
      }else{
        
        this.confirmRecusa();

      }

    }

  }

  private confirmRecusa() {

    const title = 'Atendimento';
    const msg = 'Solicitar atendimento(s) ao Profissional?';

    this.alertService.simpleBoolean(msg, title);

    this.alertService.callBack
      .subscribe((ok)=> {
        if (ok) {
          this.alertService.simpleAlert('NOTIFICA-LO DO ATENDIMENTO...');
        }else{
          this.listaProfissionais.slice(0, 0);
        }
      });
        
  }

  request(){
    
    const title = 'Pesquisando';
    const msg = `requisitando profissional para ${this.proposta.qtd} atendimentos...`;
    const toastMsg = 'busca cancelada...';
    const labelButton = 'cancelar';

    const alert = this.alertService.withToastMessage(title, msg, toastMsg, labelButton);

    alert.present();

    this.findProfDisponiveis(alert);

  }

  findProfDisponiveis(modal){

    const cidade = this.usuarioLogado.cidade;
    
    const idEspecialidade = this.tipoAtendimento.especialidade.id;

    this.propostaProvider.findProfDisponiveis(idEspecialidade, cidade)
      .then((data) => {

        this.listaProfissionais = data;

        this.proposta.profissional = data[0];

        modal.dismiss();
        
        this.showProfModal()

      })
      .catch((erro) => {

        modal.dismiss();
        
        let msg = "Não localizamos nenhum profissional disponível no momento...tente mais tarde";
        
        this.alertService.simpleAlert(erro.message, "Desculpe");

      });

  }

  showProfModal() {

    let profileModal = this.modalCtrl
      .create('PropostaSendPage', {'proposta': this.proposta});
    
    profileModal.present();

  }  

}
