import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from "ionic-angular";

import { LoginModel } from './../../model/login.model';
import { LoginProvider } from "../../providers/login/login.provider";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  login: LoginModel = {'usuario': '', 'senha' : ''};

  formLogin: FormGroup;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private loginProvider: LoginProvider,
    public navParams: NavParams) {

      this.initialize();
  }

  initialize() {

    this.formLogin = this.fb.group({
      'usuario': ['', Validators.required],
      'senha': ['',Validators.required]});    

  }

  logar(){
    this.navCtrl.push('HometabPage');
  }

}
