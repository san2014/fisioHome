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
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { FshUtils } from '../../utils/fsh-util';

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

  titleAlert: string = 'Desculpe...';
  
  msgAlert: string = 'Ocorreu uma falha na sua solicitação...Tente novamente mais tarde.';

  msgThrow: string = 'Erro de comunicação ou Serviço insdiponível';  

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
    private utils: FshUtils
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

    try {
    
      const credentials = await this.authFace()
        .catch(() => {
          throw new Error(this.msgThrow);          
        });    

      const userFace: any = await this.getUserFace(credentials.authResponse.userID)
        .catch(() => {
          throw new Error(this.msgThrow);          
        });    

      const userFind = await this.userProvider.getUserByEmail(userFace.email)
        .catch(() => {
          throw new Error(this.msgThrow);          
        });    

      if (userFind == null){

        this.usuarioModel = new UsuarioModel();
        this.usuarioModel.nome = userFace.name;
        this.usuarioModel.email = userFace.email;
        this.usuarioModel.dt_nasc = userFace.birthday;
        this.usuarioModel.imgPerfil = userFace.picture.data.url;
        this.usuarioModel.sexo = userFace.gender == 'male' ? 1 : 0;
        this.usuarioModel.tipo = 1;
        
        this.showLoading('aguarde...');

        this.userProvider.postData(this.usuarioModel)
          .catch(() => {
            throw new Error(this.msgThrow);          
          });      

        this.setUserSession(this.usuarioModel)
          .catch(() => {
            throw new Error(this.msgThrow);          
          });      

        this.hideLoading();

        this.navCtrl.push('WelcomePage',{'usuarioModel': this.usuarioModel})
        
      }else{

        this.showLoading('aguarde...');
      
        this.usuarioModel = this.userProvider.convertUserAPI(userFind[0]);

        await this.setUserSession(this.usuarioModel)
          .catch(() => {
            throw new Error(this.msgThrow);          
          });             

        this.hideLoading();

        this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel});

      }     
    
    } catch (error) {

      this.utils.showAlert(this.titleAlert, this.msgAlert);
      
    }    

  }

  getUserFace(userid) {
    return new Promise ((resolve) => {
      this.facebook.api("/"+userid+"/?fields=id,email,name,picture,birthday,gender",["public_profile"])
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
          .then(() => resolve(usuario))
          .catch((erro) => {
            reject('Erro');
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

    try {

      const userGoogle: any = await this.getDataGoogle()
        .catch(() => {
          throw new Error(this.msgThrow);          
        });

      const userFind = await this.userProvider.getUserByEmail(userGoogle.email)
        .catch(() => {
          throw new Error(this.msgThrow);
        });

      if (userFind == null){

        this.usuarioModel = new UsuarioModel();
        this.usuarioModel.nome = userGoogle.displayName;
        this.usuarioModel.email = userGoogle.email;
        this.usuarioModel.imgPerfil = userGoogle.imageUrl;  
        this.usuarioModel.tipo = 1; 

        this.showLoading('aguarde...');

        await this.userProvider.postData(this.usuarioModel)
          .catch(() => {
            throw new Error(this.msgThrow);
          });

        await this.setUserSession(this.usuarioModel)
          .catch(() => {
            throw new Error(this.msgThrow);
          });        

        this.hideLoading();

        this.navCtrl.push('WelcomePage',{'usuarioModel': this.usuarioModel})
        
      }else{

        this.showLoading('aguarde...');
      
        this.usuarioModel = this.userProvider.convertUserAPI(userFind[0]);

        await this.setUserSession(this.usuarioModel);

        this.hideLoading();

        alert(JSON.stringify(this.usuarioModel));

        this.navCtrl.push('HometabPage',{'usuarioModel': this.usuarioModel});

      }    

    } catch (error) {
      
      this.utils.showAlert(this.titleAlert, this.msgAlert);

    }    

  }

}
