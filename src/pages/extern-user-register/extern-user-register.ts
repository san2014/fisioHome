import { AppMessages } from './../../app/app-messages';
import { LoadingService } from './../../utils/loading.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FshUtils } from '../../utils/fsh-util';
import { UserProvider } from '../../providers/user/user.provider';
import { CepProvider } from '../../providers/cep/cep.provider';
import { StorageProvider } from '../../providers/storage/storage.provider';

import { UsuarioModel } from '../../model/usuario-model';
import { PerfilEnum } from '../../enum/perfil-enum';
import { AlertService } from '../../utils/alert.service';
import { FormBase } from '../../shared/form-base';


@IonicPage()
@Component({
  selector: 'page-extern-user-register',
  templateUrl: 'extern-user-register.html',
})
export class ExternUserRegisterPage extends FormBase {

  usuarioSessao: UsuarioModel;
  formUser: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private fb: FormBuilder,
    private fshUtils: FshUtils,
    private loadingService: LoadingService,
    private userProvider: UserProvider,
    private cepProvider: CepProvider,
    private storageProvider: StorageProvider,
    private alertService: AlertService
  ) { 
    
    super();

  }

  async inicializar() {

    try {
    
      const platform = await this.platform.ready();

      if (platform !== 'cordova') {
        this.formUser.get('onesignalId').setValue('test-teste-test-teste-hard');
      }   

    } catch (error) {

      console.log(error);

    }

  }

  configurarForm(){
   
    this.formUser = this.fb.group({
      'nome': [null],
      'sexo': [null, Validators.required],
      'nascimento': [null, Validators.required],
      'cep': [null, Validators.compose
        (
          [
            Validators.required,
            Validators.pattern(/[0-9]{8}/)
          ]
        )
      ],
      'logradouro': [null, Validators.required],
      'bairro': [null, Validators.required],
      'porta': [null, Validators.required]      
    });
    
    this.usuarioSessao = this.navParams.get('usuario');  

    this.formUser.get('perfil.id').setValue(PerfilEnum.ROLE_CLIENTE);
    this.formUser.get('ativo').setValue(true);
    this.formUser.get('onesignalId').setValue(this.storageProvider.getOneSignalId());

  }

  popularForm(dados: UsuarioModel) {

    this.formUser.patchValue({
      nome: dados.nome,
      imgPerfil: dados.imgPerfil,
      sexo: dados.sexo,
      nascimento: dados.nascimento,
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.cidade,
      porta: dados.porta
    });

  }

  async incluir(){
    
    try {
      
      this.loadingService.show(AppMessages.CARREGANDO);

      const postUser = await this.userProvider.postData(this.formUser.value);

      this.navCtrl.setRoot('WelcomePage');

    } catch (error) {

      this.alertService.simpleAlert(AppMessages.ERRO_OPERACAO);
      
    } finally {

      this.loadingService.hide();

    }
    
    
  } 
  
   getAddresByCep(): boolean{

    let cep = this.formUser.get('cep');
  
    if (!cep.valid){
      return false;
    }

    try {
      
      this.loadingService.show(AppMessages.CARREGANDO);
    
      const endereco = this.cepProvider.getAddressByCep(cep.value);

      this.preencherEndereco(endereco);

    } catch (error) {

      this.alertService.simpleAlert('Ocorreu um erro ao obter informações do CEP informado');

    } finally {

      this.loadingService.hide();

    }
      
  }  

  private preencherEndereco(endereco) {

    this.formUser.patchValue({
      logradouro : endereco.logradouro,
      bairro : endereco.bairro
    });    

  }

}
