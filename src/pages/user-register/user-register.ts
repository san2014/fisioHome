   
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FshUtils } from './../../utils/fsh-util';
import { LoginProvider } from './../../providers/login/login.provider';
import { UserProvider } from './../../providers/user/user.provider';
import { UsuarioModel } from './../../model/usuario-model';


@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegister {

  usuario: UsuarioModel;

  tipoUsuario: string;

  formUser: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private userProvider: UserProvider,
    private loginProvider: LoginProvider,
    private fshUtils: FshUtils,
    private navParams: NavParams) {

      this.initialize();
  }

  initialize() {

    this.formUser = this.fb.group({
      'cpf': ['', Validators.required],
      'rg': ['', Validators.required],
      'nome': ['',Validators.required],
      'senha': ['',Validators.compose
        (
          [
            Validators.required, 
            Validators.minLength(6),
            Validators.maxLength(6)
          ]
        )
      ],
      'email': ['',Validators.compose([Validators.required, Validators.email])],
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
      'numero_local': ['',Validators.required],
      'flag_ativo' : ['']
    });

    this.tipoUsuario = this.navParams.get('tipoUsuario');
    
    this.usuario = new UsuarioModel(); 
    
    this.usuario.flag_ativo = true;

    this.getUsuarioLogado();

  }

  async getUsuarioLogado(){
    this.usuario = await this.loginProvider.getUsuarioLogado();
    if (this.usuario == null){
      this.usuario = new UsuarioModel();
    }
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

  incluir(){
    //this.navCtrl.push('UserPicturePage', {'usuario': this.usuario});

    this.formUser.value.flag_ativo = "1";

    this.fshUtils.showLoading('aguarde...');
    
    this.userProvider.postData(this.formUser.value)
      .then((res) => {

        this.fshUtils.hideLoading();
        
        const titulo = 'Parabéns';
        
        const msg = `Seja bem vindo ${this.usuario.nome}! \n A seguir defina uma imagem para seu perfil...` ;
        
        this.fshUtils.showAlert(titulo, msg);

      })
      .catch((error) => {

        this.fshUtils.hideLoading();
        
        const titulo = 'Desculpe';
        
        const msg = `Ocorreu um erro ao registrar as informações. \n Tente novamente mais tarde....` ;
        
        this.fshUtils.showAlert(titulo, msg);  

      });

  }

}
