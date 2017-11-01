import { Subscription } from 'rxjs/Subscription';
import { UserProvider } from './../../providers/user/user.provider';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

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

  postUser: Subscription;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private loginProvider: LoginProvider,
    private userProvider: UserProvider,
    private storage: Storage,
    public navParams: NavParams,
    public facebook: Facebook,
    private googlePlus: GooglePlus
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

  async logar(){

    this.msgError = [];

    let erro: boolean = true;

    await this.loginProvider.login(this.loginModel)
      .then(data => {

        if (data !== null){
          
          this.usuarioModel = data;
          
          erro = false;

        }
        
      })

      if (!erro){
        
        await this.storage.set('usuarioLogado', this.usuarioModel)
          .then(() => {
          
            this.navCtrl
              .push('HometabPage',{'usuarioModel': this.usuarioModel}),
              error => (erro = true)
          }) 

      }

      if (erro){

        this.pushErroLogin();

      }

  }

  ionViewWillEnter(){

    if (this.usuarioModel.id != undefined){

      this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel})

    }

  }

  ionViewDidLeave(){
    
    if (this.postUser != undefined){
    
      this.postUser.unsubscribe();

    }

  }

  loginFace(){
    this.facebook.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        
        this.setUserFace(res.authResponse.userID);
        
      })
      .catch(e => this.msgError.push('Ocorreu um erro na operação'));     
  }

  setUserFace(userid) {
    this.facebook.api("/"+userid+"/?fields=id,email,name,picture,birthday",["public_profile"])
      .then(profile => {

        this.usuarioModel.nome = profile.name;
        
        this.usuarioModel.email = profile.email;
        
        this.usuarioModel.dtNasc = profile.birthday;
        
        this.usuarioModel.imgPerfil = profile.picture.data.url;
        
        this.usuarioModel.facebookId = userid;

        this.postUser = this.userProvider
          .postData(JSON.stringify(this.usuarioModel))
            .subscribe(
              data =>{

                this.storage.set('usuarioLogado', this.usuarioModel)
                  .then(() =>{
                    this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel}
                  )}
                );
                
              },
              error => (this.msgError.push('Ocorreu um erro na operação'))
          )
      })
     
  }  

  loginGoogle(){

    this.googlePlus.login({})
    .then(res => {
      
      alert(JSON.stringify(res));

    })
    .catch(err => alert(JSON.stringify(err)));

  }

  logoutGoogle() {

    this.googlePlus.logout()
    .then(res => {

      console.log(res);

    })
    .catch(err => console.error(err));

  }

}
