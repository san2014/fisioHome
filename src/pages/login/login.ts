import { Subscription } from 'rxjs/Subscription';
import { UserProvider } from './../../providers/user/user.provider';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, Loading } from "ionic-angular";
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

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private loginProvider: LoginProvider,
    private userProvider: UserProvider,
    private storage: Storage,
    public navParams: NavParams,
    public facebook: Facebook,
    private googlePlus: GooglePlus,
    private loadingCtrl: LoadingController,
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

  showLoading(msg: string){
    
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();     

  }

  hideLoading(){
    this.loading.dismiss();
  }

  async loginFace(){
    
    const credentials = await this.authFace();

    const userFace: any = await this.getUserFace(credentials.authResponse.userID);

    const userFind = await this.userProvider.getUserByEmail(userFace.email);
    
    if (userFind == null){

      this.usuarioModel = new UsuarioModel();
      this.usuarioModel.nome = userFace.name;
      this.usuarioModel.email = userFace.email;
      this.usuarioModel.dt_nasc = userFace.birthday;
      this.usuarioModel.imgPerfil = userFace.picture.data.url;
      this.usuarioModel.tipo = 1;
      
      this.showLoading('aguarde...');

      this.userProvider.postData(this.usuarioModel);

      this.setUserSession(this.usuarioModel);

      this.hideLoading();

      if (this.usuarioModel == null){
        this.msgError.push('Ocorreu um erro na operação');
      }else{
        this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel})
      }   
      
    }else{
    
      this.usuarioModel = this.userProvider.convertUserAPI(userFind[0]);

      await this.setUserSession(this.usuarioModel);

      this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel});

    }  


  }

  getUserFace(userid) {

    return new Promise ((resolve) => {
      this.facebook.api("/"+userid+"/?fields=id,email,name,picture,birthday",["public_profile"])
        .then(profile => {
          resolve(profile);
        })
        .catch(()=> {
          resolve(null);
        });
    });

  } 
  
  setUserSession(usuario: UsuarioModel){
    if (usuario != null){

      return new Promise((resolve, reject) => {
        this.storage.set('usuarioLogado', usuario)
          .catch((erro) => {
            this.usuarioModel = null;
          });
      })

    }
  }  

  getDataGoogle(){
    return new Promise((resolve) => { 
      this.googlePlus.login({})
        .then(res => {
          resolve(res);
        })
        .catch(() => {
          resolve(null)
        });
    })
  }

  authFace(){
    return new Promise<FacebookLoginResponse>((resolve) => { 
      this.facebook.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
          resolve(res);
        })
        .catch( () => {
          resolve(null);
        });
    });         
  }  

  async loginGoogle(){

    const userGoogle: any = await this.getDataGoogle();

    const userFind = await this.userProvider.getUserByEmail(userGoogle.email);

    if (userFind == null){

      this.usuarioModel = new UsuarioModel();
      this.usuarioModel.nome = userGoogle.displayName;
      this.usuarioModel.email = userGoogle.email;
      this.usuarioModel.imgPerfil = userGoogle.imageUrl;  
      this.usuarioModel.tipo = 1;      

      this.showLoading('aguarde...');

      await this.userProvider.postData(this.usuarioModel);

      await this.setUserSession(this.usuarioModel);

      this.hideLoading();

      if (this.usuarioModel == null){
        this.msgError.push('Ocorreu um erro na operação');
      }else{
        this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel})
      }   
      
    }else{
    
      this.usuarioModel = this.userProvider.convertUserAPI(userFind[0]);

      await this.setUserSession(this.usuarioModel);

      this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel});

    }    

    

  }

}
