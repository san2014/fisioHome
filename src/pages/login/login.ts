import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams, IonicPage, LoadingController, Loading } from "ionic-angular";
import { CookieService } from 'angular2-cookie/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { UserProvider } from './../../providers/user/user.provider';

import { LoginModel } from './../../model/login.model';
import { UsuarioModel } from './../../model/usuario-model';
import { LoginProvider } from "../../providers/login/login.provider";
import { TokenResponseModel } from './../../model/token-response.model';

import { FshUtils } from '../../utils/fsh-util';
import { PerfilEnum } from '../../enum/perfil-enum';
import { Perfil } from '../../model/perfil.model';


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

  loading: Loading;

  titleAlert: string = 'Desculpe...';
  
  msgAlert: string = 'Ocorreu uma falha na sua solicitação...Tente novamente mais tarde.';

  msgThrow: string = 'Erro de comunicação ou Serviço insdiponível';  

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private loginProvider: LoginProvider,
    private userProvider: UserProvider,
    private cookieService: CookieService,
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
        'email': ['', Validators.required],
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

    this.showLoading('aguarde...');
    
    try {

        let tokenResponse: TokenResponseModel;

        await this.loginProvider.login(this.loginModel)
          .then(data => tokenResponse = data)
          .catch((erro) => {
            throw new Error('Login Error');
          });

        await this.loginProvider.getUsuarioAtual(tokenResponse.token)
          .then(data => this.usuarioModel = data)
          .catch((erro) => {
            throw new Error('Login Error');
          });          
        
        this.loginProvider.setUsuarioSessao(this.usuarioModel);
          
        this.redirectPage();

    } catch (error) {

      this.pushErroLogin();

    }

    this.hideLoading();

  }

  public loginSuccess(res: TokenResponseModel) {
    this.loginProvider.getUsuarioAtual(res.token)
      .then(res => this.redirectPage());
  }

  public redirectPage() {
    this.navCtrl.setRoot('HometabPage', {'usuarioModel': this.usuarioModel});
  }  

  ionViewWillEnter(){
    if (this.usuarioModel.id != undefined){
      this.redirectPage();
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

      this.showLoading('aguarde...');
    
      const credentials = await this.authFace()
        .catch(() => {
          throw new Error(this.msgThrow);  
        });
        
      const userFace: any = await this.getUserFace(credentials.authResponse.userID)
        .catch(() => {
          throw new Error(this.msgThrow);          
        });    
      
      const userFind = await this.userProvider.getUserByEmail(userFace.email)
        .catch((error) => {
          //throw new Error(this.msgThrow);   
          throw new Error(JSON.stringify(error));
        });    

      if ((userFind == null || userFind == undefined ) && userFace != null){

        this.usuarioModel = new UsuarioModel();
        this.usuarioModel.nome = userFace.name;
        this.usuarioModel.email = userFace.email;
        this.usuarioModel.nascimento = userFace.birthday;
        this.usuarioModel.imgPerfil = userFace.picture.data.url;
        this.usuarioModel.sexo = userFace.gender == 'male' ? 1 : 0;
        this.usuarioModel.perfil = new Perfil();
        this.usuarioModel.perfil.id = PerfilEnum.ROLE_CLIENTE;

        this.navCtrl.push('ExternUserRegisterPage',{'usuario': this.usuarioModel})
        
      }else{
        this.usuarioModel = this.utils.convertUserAPI(userFind);

        this.setUserSession(this.usuarioModel);

        this.navCtrl.setRoot('HometabPage',{'usuarioModel': this.usuarioModel});
      }     
    
    } catch (error) {
      this.utils.showAlert(this.titleAlert, error);
    }  
    
    this.hideLoading();

  }

  getUserFace(userid) {
    return new Promise ((resolve) => {
      this.facebook.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
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
      this.cookieService.putObject('usuarioLogado', usuario);
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

      this.showLoading('aguarde...');

      let userGoogle: any = await this.getDataGoogle()
        .catch(() => {
          throw new Error(this.msgThrow);          
        });

      const userFind = await this.userProvider.getUserByEmail(userGoogle.email)
        .catch((erro) => {
          throw new Error(this.msgThrow);
        });

      if ((userFind == null || userFind == undefined ) && userGoogle != null){

        this.usuarioModel = new UsuarioModel();
        this.usuarioModel.nome = userGoogle.displayName;
        this.usuarioModel.email = userGoogle.email;
        this.usuarioModel.imgPerfil = userGoogle.imageUrl;  
        this.usuarioModel.google_id = userGoogle.id;
        this.usuarioModel.perfil = new Perfil();
        this.usuarioModel.perfil.id = PerfilEnum.ROLE_CLIENTE;
        this.usuarioModel.senha = this.generatePass(this.usuarioModel.nome);

        this.navCtrl.push('ExternUserRegisterPage',{'usuario': this.usuarioModel})
        
      }else{

        this.usuarioModel = this.utils.convertUserAPI(userFind[0]);

        await this.setUserSession(this.usuarioModel);

        this.navCtrl.setRoot('HometabPage',{'usuarioModel': this.usuarioModel});

      }    

    } catch (error) {
      
      this.utils.showAlert(this.titleAlert, this.msgAlert);

    }    

    this.hideLoading();

  }

  generatePass(value: string): string{
    value = value.substring(0,3);
    for (let index = 0; index <= 4; index++) {
      value = value + this.getRandomInt(1,9);
    }
    return value;
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  


}
