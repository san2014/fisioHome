import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { LoginModel } from './../../model/login.model';
import { UsuarioModel } from './../../model/usuario-model';
import { LoginProvider } from "../../providers/login/login.provider";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loginModel: LoginModel;
  
  usuarioModel: UsuarioModel;

  formLogin: FormGroup;

  msgError: string[];

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private loginProvider: LoginProvider,
    private storage: Storage,
    public navParams: NavParams) {

      this.initialize();

  }

  initialize() {

    this.formLogin = this.fb.group(
      {
        'usuario': ['', Validators.required],
        'senha': ['',Validators.required]
      }); 
      
    this.msgError = [];

    this.loginModel = {'usuario': '', 'senha' : ''};

  }

  pushErroLogin(){
    
    this.msgError.push('Usuário ou senha inválidos');

  }

  logar(){

    this.msgError = [];

    let erro: boolean = true;

    this.loginProvider.login(this.loginModel)
      .then(data => {

        if (data !== null){

          this.usuarioModel = data;

          erro = false;

          this.storage.set('usuarioLogado', this.usuarioModel)
          .then(
            () => this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel}),
            error => (console.error(error))
          )

        }

        if (erro === true){
         
          this.pushErroLogin();

        }

      })
      .catch(error => {

        this.pushErroLogin();

      })

  }

}
