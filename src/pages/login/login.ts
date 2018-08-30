import { AppMessages } from './../../app/app-messages';
import { LoadingService } from './../../utils/loading.service';
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
import { AlertService } from '../../utils/alert.service';

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
    private loadingService: LoadingService,
    private utils: FshUtils,
    private alertService: AlertService
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

    try {
      
      this.loadingService.show(AppMessages.AGUARDE);

      const tokenResponse = await this.loginProvider.login(this.loginModel)

      this.storageProvider.setAccessToken(tokenResponse.token);
        
      this.usuarioModel = await this.loginProvider.getUsuarioAtual(tokenResponse.token)
      
      this.storageProvider.setUsuarioSessao(this.usuarioModel);
        
      this.redirectPage();

    } catch (error) {

      this.pushErroLogin();

    } finally {

        this.loadingService.hide();

    }

  }

  public async loginSuccess(res: TokenResponseModel) {

    await this.loginProvider.getUsuarioAtual(res.token)
      .then(res => this.redirectPage());

  }

  public redirectPage() {

    this.navCtrl.setRoot('HometabPage', {'usuarioModel': this.usuarioModel});

  }  

  ionViewWillEnter(){

    if (!this.usuarioModel.id){
      this.redirectPage();
    }

  }

  async loginFace(){

    try {

      this.loadingService.show(AppMessages.AGUARDE);
        
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

      this.alertService.simpleAlert(this.titleAlert, error);

    } finally {

      this.loadingService.hide();

    }

  }

  async loginGoogle(){

    try {

      this.loadingService.show(AppMessages.AGUARDE);

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
      
      this.alertService.simpleAlert(this.titleAlert, error);

    } finally {

      this.loadingService.hide();

    }

  }

}
