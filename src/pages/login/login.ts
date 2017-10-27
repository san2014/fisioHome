import { UserProvider } from './../../providers/user/user.provider';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
    private userProvider: UserProvider,
    private storage: Storage,
    public navParams: NavParams,
    public facebook: Facebook
  ) {

      this.initialize();

  }

  initialize() {

    this.formLogin = this.fb.group(
      {
        'usuario': ['', Validators.required],
        'senha': ['',Validators.required]
      }); 
      
    this.msgError = [];

    this.loginModel = new LoginModel();

    this.usuarioModel = new UsuarioModel();

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
          .then(() => 
            this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel}),
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

  loginFace(){

    this.usuarioModel.cpf = 12345678;
    this.usuarioModel.nome = "teste model";
    this.usuarioModel.login = "teste";
    this.usuarioModel.senha = "teste";
    this.usuarioModel.email = "mail@mail.com";
    this.usuarioModel.dtNasc = '27/12/1984';
    this.usuarioModel.cep = 40430200;
    this.usuarioModel.logradouro = "teste";
    this.usuarioModel.bairro = "teste";
    this.usuarioModel.numero = "10";
    this.usuarioModel.imgPerfil = 'dsadsdda';
    //this.usuarioModel.facebookId = 12212222;

    this.userProvider
    .postData(this.usuarioModel)
    .subscribe(
      data =>{
        alert(data);
        this.storage.set('usuarioLogado', this.usuarioModel);
        this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel})
      }
    )
    .unsubscribe();    

/* 
    this.facebook.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      this.getUserDetail(res.authResponse.userID);
    })
    .catch(e => console.log('Error logging into Facebook', e));  */   
  }

  getUserDetail(userid) {
    this.facebook.api("/"+userid+"/?fields=id,email,name,picture,birthday",["public_profile"])
      .then(profile => {
        //alert(JSON.stringify(profile));
        this.usuarioModel.nome = profile.name;
        this.usuarioModel.email = profile.email;
        this.usuarioModel.dtNasc = profile.birthday;
        this.usuarioModel.imgPerfil = profile.picture.data.url;
        this.usuarioModel.facebookId = userid;
        //alert(JSON.stringify(this.usuarioModel));
        this.userProvider
          .postData(this.usuarioModel)
          .subscribe(
            data =>{
              alert(data);
              this.storage.set('usuarioLogado', this.usuarioModel);
              this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel})
            }
          )
          .unsubscribe();
      })
      .catch(e => {
        console.log(e);
      });
  }  

}
