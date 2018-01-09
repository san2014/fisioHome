import { TipoAtendimentoModel } from './../../model/tipoatendimento-model';
import { ProfissionalModel } from './../../model/profissional-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioModel } from './../../model/usuario-model';
import { LoginProvider } from './../../providers/login/login.provider';
import { TipoAtendimentoProvider } from "../../providers/tipo-atendimento/tipo-atendimento.provider";

@IonicPage()
@Component({
  selector: 'page-prof-register',
  templateUrl: 'prof-register.html',
})
export class ProfRegisterPage {

  usuario: UsuarioModel;

  profissional: ProfissionalModel;

  tipoUsuario: string;
  
  formProf: FormGroup;

  especialidade: TipoAtendimentoModel;

  listEspecialidades: Array<any>;

  tpsAtds: Array<TipoAtendimentoModel>;

  removeNote: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginProvider: LoginProvider,
    private fb: FormBuilder,
    private tpAtdProvider: TipoAtendimentoProvider,
    private alert: AlertController
  ) {

      this.initialize();
  }

  initialize() {
    this.usuario = new UsuarioModel();
    this.profissional = new ProfissionalModel();
    this.listEspecialidades = new Array<any>();

    this.initEspecialidade();
    this.initForm();
    this.loadTpsAtds();
    this.setUserLogado();
  }

  initEspecialidade(){
    this.especialidade = new TipoAtendimentoModel();
    this.especialidade.id = 0;
    this.especialidade.descricao = 'Selecione...';
    this.especialidade.valor = null;
  }

  initForm(){
    this.formProf = this.fb.group({
      'credenciamento': ['', Validators.required],
      'conta': ['',Validators.required],
      'agencia': ['',Validators.required],
      'banco': ['',Validators.required],
      'especialidade':['']
    });    
  }

  loadTpsAtds(){
    this.tpAtdProvider.tiposAtendimentos()
    .then(data =>{
      this.tpsAtds = data;
      this.tpsAtds.unshift(this.especialidade);
    })
    .catch(() => this.tpsAtds = [])    
  }

  setUserLogado(){
    this.usuario = this.loginProvider.getUsuarioLogado();
  }

  aplicaCssErro(campo: string) {
    return {
      'box-register-error': this.hasError(campo),
      'box-register': this.hasSuccess(campo) || this.notUsed(campo)
    };
  }  

  notUsed(campo){
    return this.formProf.get(campo).pristine;
  }

  hasSuccess(campo): boolean{
     return this.formProf.get(campo).valid;
   }  
  
  hasError(campo): boolean{
    return (
      !this.formProf.get(campo).valid &&
      (this.formProf.get(campo).touched || this.formProf.get(campo).dirty)
    );
  }  

  addEsp(){
    let found = this.listEspecialidades.filter(
      row => row.id === this.especialidade.id).length;

   if (this.especialidade.id != 0 && found === 0){
      this.listEspecialidades.push(this.especialidade);
      this.initEspecialidade();
    }
  }

  removeEsp(especialidade: TipoAtendimentoModel){
    let index = this.listEspecialidades.indexOf(especialidade);
    this.listEspecialidades.splice(index, 1);
  }

  compareFn(e1: TipoAtendimentoModel, e2: TipoAtendimentoModel): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }  

  clearNote(){
    this.removeNote = true;
  }

  presentAlert() {
    let alert = this.alert.create({
      title: 'Sucesso!',
      subTitle: 'A próxima etapa é o upload de arquivos.',
      buttons: ['Ok']
    });
    alert.present();
  }  

  enviar(){
    this.presentAlert();
  }

}
