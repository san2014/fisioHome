import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FshUtils } from './../../utils/fsh-util';
import { UserProvider } from './../../providers/user/user.provider';
import { CepProvider } from '../../providers/cep/cep.provider';

import { UsuarioModel } from './../../model/usuario-model';


@IonicPage()
@Component({
  selector: 'page-extern-user-register',
  templateUrl: 'extern-user-register.html',
})
export class ExternUserRegisterPage {

  usuario: UsuarioModel;
  formUser: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private fshUtils: FshUtils,
    private userProvider: UserProvider,
    private cepProvider: CepProvider
  ) {

    this.initialize();

  }

  initialize(){
    
    this.usuario = new UsuarioModel();

    this.formUser = this.fb.group({
      'nome': [null],
      'sexo': ['',Validators.required],
      'dt_nasc': ['',Validators.required],
      'cep': ['',Validators.compose
        (
          [
            Validators.required,
            Validators.pattern(/[0-9]{8}/)
          ]
        )
      ],
      'logradouro': ['',Validators.required],
      'bairro': ['',Validators.required],
      'numero_local': ['',Validators.required]      
    });
    
    this.usuario = this.navParams.get('usuario');  

    this.usuario.flag_ativo = 1;

  }

  incluir(){
    
    this.fshUtils.showLoading('aguarde...');
    
    this.userProvider.postData(this.usuario)
      .then((res) => {

        this.fshUtils.hideLoading();
        
        this.navCtrl.push('WelcomePage',{'usuarioModel': this.usuario})

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
        this.usuario.logradouro = address.logradouro;
        this.usuario.bairro = address.bairro;
      })
      .catch((erro) => {
        this.fshUtils.hideLoading();
        this.fshUtils.showAlert('Desculpe', 'Ocorreu um erro ao obter informações do CEP informado.');
      });
      
  }  

}
