import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-choice',
  templateUrl: 'user-choice.html',
})
export class UserChoicePage {

  tipoUsuario: string;

  formChoice: FormGroup;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    public navParams: NavParams) {

      this.initialize();
  }

  initialize() {
    this.formChoice = this.fb.group({
      'tipoUsuario': ['', Validators.required]
    });  
  }

  continuar(){
    this.navCtrl.push('UserRegister', {'tipoUsuario' : this.tipoUsuario});
  }

}
