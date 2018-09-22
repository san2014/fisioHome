import { LoadingService } from './../../utils/loading.service';
import { LoginProvider } from './../../providers/login/login.provider';
import { TipoAtendimentoProvider } from './../../providers/tipo-atendimento/tipo-atendimento.provider';
import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';

import { NavController, IonicPage, Platform } from 'ionic-angular';
import { Component} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { UserProvider } from '../../providers/user/user.provider';
import { FshUtils } from '../../utils/fsh-util';
import { CepProvider } from '../../providers/cep/cep.provider';
import { StorageProvider } from '../../providers/storage/storage.provider';

import { UsuarioModel } from '../../model/usuario-model';
import { PerfilEnum } from '../../enum/perfil-enum';

import { AlertService } from '../../utils/alert.service';

import { FormBase } from '../../shared/form-base';
import { AppMessages } from '../../app/app-messages';


@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegister extends FormBase {

  usuarioSessao: UsuarioModel;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private platform: Platform,
    private userProvider: UserProvider,
    private storageProvider: StorageProvider,
    private loadingService: LoadingService,
    private fshUtils: FshUtils,
    private cepProvider: CepProvider,
    private alertService: AlertService
  ) { 

    super();

  }

  protected inicializar() { }  

  protected configurarForm(){
   
    this.formulario = this.fb.group({
      'id': [null],
      'cpf': [null, Validators.required],
      'rg': [null, Validators.required],
      'nome': [null, Validators.required],
      'apelido': [null, Validators.required],
      'sexo': [null, Validators.required],
      'senha': [null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      'email': [null, [Validators.required, Validators.email]],
      'nascimento': [null, [Validators.required,Validators.pattern(/^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/)]],
      'cep': [null, [Validators.required,Validators.pattern(/[0-9]{8}/)]],
      'cidade': [null, Validators.required],
      'logradouro': [null, Validators.required],
      'bairro': [null, Validators.required],
      'porta': [null,Validators.required],
      'ativo' : [null],
      'onesignalId':[null],

      'perfil': this.fb.group({
        'id': [null, Validators.required]
      })

    });

    this.formulario.patchValue({
      perfil : {id: PerfilEnum.ROLE_CLIENTE},
      ativo: true,
      onesignalId: this.storageProvider.getOneSignalId()
    });

    if (!this.platform.is('cordova')){
      this.formulario.get('onesignalId').setValue('test-teste-test-teste-hard');
    }      

  }

  validaCPF(){
    
    const cpf = this.formulario.get('cpf');

    if (this.fshUtils.validaCPF(cpf.value) === false){
      cpf.setErrors({"required": "0"});
    } 

  }

  async getAddresByCep(){
    
    let cep = this.formulario.get('cep');

    if (!cep.valid){
      return false;
    }    

    try {
      
      this.loadingService.show(AppMessages.CARREGANDO);
      
      const endereco = await this.cepProvider.getAddressByCep(cep.value);
      
      this.preencherEndereco(endereco);
      
    } catch (error) {
      
      this.alertService.simpleAlert(AppMessages.FALHA_CEP);
    
    } finally {
      
      this.loadingService.hide();

    }

  }

  async incluir(){

    try{

      this.loadingService.show('aguarde...');

      this.usuarioSessao = await this.userProvider.postData(this.formulario.value)

      this.storageProvider.setUsuarioSessao(this.usuarioSessao);
  
      this.navCtrl.push('WelcomePage');

    } catch(error) {

      this.alertService.simpleAlert(AppMessages.ERRO_OPERACAO); 

    } finally {
      
      this.loadingService.hide();

    }

  }

  private preencherEndereco(endereco) {

    this.formulario.patchValue({
      logradouro : endereco.logradouro,
      bairro : endereco.bairro,
      cidade : endereco.localidade          
    });
        
  }

}
