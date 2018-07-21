import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams, IonicPage, LoadingController, Loading } from "ionic-angular";

import { UserProvider } from '../../providers/user/user.provider';
import { StorageProvider } from '../../providers/storage/storage.provider';
import { GoogleProvider } from './../../providers/google/google.provider';
import { FacebookProvider } from './../../providers/facebook/facebook.provider';

import { LoginModel } from '../../model/login.model';
import { UsuarioModel } from '../../model/usuario-model';
import { LoginProvider } from "../../providers/login/login.provider";
import { TokenResponseModel } from '../../model/token-response.model';

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

  loading: Loading;

  titleAlert: string = 'Desculpe...';
  
  msgAlert: string = 'Ocorreu uma falha na sua solicitação...Tente novamente mais tarde.';

  msgThrow: string = 'Erro de comunicação ou Serviço insdiponível';  

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private loginProvider: LoginProvider,
    private userProvider: UserProvider,
    private storageProvider: StorageProvider,
    public navParams: NavParams,
    public facebookProvider: FacebookProvider,
    private googleProvider: GoogleProvider,
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
        
        this.storageProvider.setUsuarioSessao(this.usuarioModel);
          
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
        
      let userFace: UsuarioModel = await this.facebookProvider.login()
        .catch((error) => {
          throw new FacebookFalhaValidacaoError();          
        });
      
      const userFind = await this.userProvider.getUserByEmail(userFace.email)
        .catch((error) => {
          throw new ErroServidorError();   
        });    

      if (userFind){

        this.storageProvider.setUsuarioSessao(userFind);

        this.navCtrl.setRoot('HometabPage');
        
      }else if(userFace){
        
        this.navCtrl.push('ExternUserRegisterPage', {usuarioModel: userFace})
        
      }     
    
    } catch (error) {

      this.utils.showAlert(this.titleAlert, error);

    }  
    
    this.hideLoading();

  }

  async loginGoogle(){

    try {

      this.showLoading('aguarde...');

      let userGoogle: UsuarioModel = await this.googleProvider.login()
        .catch((error) => {
          throw new GoogleFalhaValidacaoError();          
        });

      const userFind = await this.userProvider.getUserByEmail(userGoogle.email)
        .catch((erro) => {
          throw new ErroServidorError();
        });

      if (userFind){

        this.storageProvider.setUsuarioSessao(userFind);

        this.navCtrl.setRoot('HometabPage');
        
      }else if(userGoogle){ 
        
        this.navCtrl.push('ExternUserRegisterPage', {usuarioModel: userGoogle})

      }

    } catch (error) {
      
      this.utils.showAlert(this.titleAlert, error);

    }    

    this.hideLoading();

  }

}
