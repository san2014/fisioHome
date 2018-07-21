import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FshUtils } from '../../utils/fsh-util';
import { UserProvider } from '../../providers/user/user.provider';
import { CepProvider } from '../../providers/cep/cep.provider';
import { StorageProvider } from '../../providers/storage/storage.provider';

import { UsuarioModel } from '../../model/usuario-model';
import { PerfilEnum } from '../../enum/perfil-enum';


@IonicPage()
@Component({
  selector: 'page-extern-user-register',
  templateUrl: 'extern-user-register.html',
})
export class ExternUserRegisterPage {

  usuarioSessao: UsuarioModel;
  formUser: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private fb: FormBuilder,
    private fshUtils: FshUtils,
    private userProvider: UserProvider,
    private cepProvider: CepProvider,
    private storageProvider: StorageProvider
  ) { 
    
    this.configurarForm();

    platform.ready()
    .then(() => {
      if (!platform.is('cordova')){
        this.formUser.get('onesignalId').setValue('test-teste-test-teste-hard');
      }   
    });     

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

  incluir(){
    
    this.fshUtils.showLoading('aguarde...');
    
    this.userProvider.postData(this.formUser.value)
      .then((res) => {

        this.fshUtils.hideLoading();

        this.usuarioSessao = res;
        
        this.navCtrl.push('WelcomePage',{'usuarioModel': this.usuarioSessao})

      })
      .catch((error) => {

        this.fshUtils.hideLoading();
        
        const titulo = 'Desculpe';
        
        const msg = `Ocorreu um erro ao registrar as informações. \n Tente novamente mais tarde....` ;
        
        this.fshUtils.showAlert(titulo, msg);  

      });

  } 
  
  aplicaCssErro(campo: string) {
    return {
      'box-register-error': this.hasError(campo),
      'box-register': this.hasSuccess(campo) || this.notUsed(campo)
    };
  }  

  notUsed(campo){
    return this.formUser.get(campo).pristine;
  }

  hasSuccess(campo): boolean{
     return this.formUser.get(campo).valid;
   }  
  
  hasError(campo): boolean{
    return (
      !this.formUser.get(campo).valid &&
      (this.formUser.get(campo).touched || this.formUser.get(campo).dirty)
    );
  }

  getAddresByCep(): boolean{

    let cep = this.formUser.get('cep');
  
    if (!cep.valid){
      return false;
    }

    this.fshUtils.showLoading('obtendo informações....');
    
    this.cepProvider.getAddressByCep(cep.value)
      .then((address) =>{
        
        this.fshUtils.hideLoading();

        this.formUser.patchValue({
          logradouro : address.logradouro,
          bairro : address.bairro
        });

      })
      .catch((erro) => {

        this.fshUtils.hideLoading();

        this.fshUtils.showAlert('Desculpe', 'Ocorreu um erro ao obter informações do CEP informado.');

      });
      
  }  

}
