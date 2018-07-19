
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { LoginProvider } from './../../providers/login/login.provider';
import { UserProvider } from './../../providers/user/user.provider';
import { FshUtils } from './../../utils/fsh-util';
import { CepProvider } from './../../providers/cep/cep.provider';

import { UsuarioModel } from './../../model/usuario-model';
import { PerfilEnum } from '../../enum/perfil-enum';

@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegister {

  usuarioSessao: UsuarioModel;

  formUser: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private platform: Platform,
    private userProvider: UserProvider,
    private loginProvider: LoginProvider,
    private fshUtils: FshUtils,
    private cepProvider: CepProvider) { 

      this.configurarForm();

      platform.ready()
      .then(() => {
        
        if (!platform.is('cordova')){
          this.formUser.get('onesignalId').setValue('test-teste-test-teste-hard');
        }   
        
    })      
      
  }


  configurarForm(){
   
    this.formUser = this.fb.group({
      'id': [null],
      'cpf': [null, Validators.required],
      'rg': [null, Validators.required],
      'nome': [null, Validators.required],
      'apelido': [null, Validators.required],
      'sexo': [null, Validators.required],
      'senha': [null, Validators.compose
        (
          [
            Validators.required, 
            Validators.minLength(6),
            Validators.maxLength(8)
          ]
        )
      ],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'nascimento': [null, Validators.compose(
          [
            Validators.required,
            Validators.pattern(/^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/)

          ]
        )
      ],
      'cep': [null, Validators.compose
        (
          [
            Validators.required,
            Validators.pattern(/[0-9]{8}/)
          ]
        )
      ],
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

    this.formUser.get('perfil.id').setValue(PerfilEnum.ROLE_CLIENTE);
    this.formUser.get('ativo').setValue(true);
    this.formUser.get('onesignalId').setValue(this.loginProvider.getOneSignalId());

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

  validaCPF(){
    
    const cpf = this.formUser.get('cpf');

    if (this.fshUtils.validaCPF(cpf.value) === false){
      cpf.setErrors({"required": "0"});
    } 

  }

  getAddresByCep(){

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
          bairro : address.bairro,
          cidade : address.localidade          
        })

      })
      .catch((erro) => {

        this.fshUtils.hideLoading();

        this.fshUtils.showAlert('Desculpe', 'Ocorreu um erro ao obter informações do CEP informado.');

      });

  }

  async incluir(){

    let erro: boolean = false;

    let msg: string;

    const titulo: string = 'Desculpe';

    try{

      this.fshUtils.showLoading('aguarde...');

      await this.userProvider.postData(this.formUser.value)
        .then((res) => {

          this.usuarioSessao = res;

        })
        .catch((error) => {

          msg = `Ocorreu um erro ao registrar as informações. \n Tente novamente mais tarde....` ;

          throw new Error(error);

        });

    }catch(error){

      erro = true;
      
      this.fshUtils.showAlert(titulo, msg); 

    }

    this.fshUtils.hideLoading();

    if (erro === false){
      
      this.loginProvider.setUsuarioSessao(this.usuarioSessao);

      this.navCtrl.push('WelcomePage',{'usuarioModel': this.usuarioSessao});

    }

  }

}
