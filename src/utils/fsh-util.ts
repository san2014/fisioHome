import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';
import { UsuarioModel } from '../model/usuario-model';

@Injectable()
export class FshUtils{

    loading: Loading

    constructor(
        private loadingCtrl: LoadingController,
        private alert: AlertController
    ){}
    
    showLoading(msg: string){
        this.loading = this.loadingCtrl.create({
            content: msg
        });
        this.loading.present();  
    }

    hideLoading(){
        this.loading.dismiss();
    }
    
    showAlert(titulo: string, msg: string) {
        let alert = this.alert.create({
            title: titulo,
            message: msg,
            buttons: [
                {text: 'Ok'}
            ]
        });
        
        alert.present();
    }     

    convertUserAPI(api_user: any): UsuarioModel{
        let usuarioModel = new UsuarioModel();

        usuarioModel.id = api_user.usua_id;
        usuarioModel.bairro = api_user.usua_bairro;
        usuarioModel.nome = api_user.usua_nome;
        usuarioModel.cpf = api_user.usua_cpf;
        usuarioModel.rg = api_user.usua_rg;
        usuarioModel.email = api_user.usua_email;
        usuarioModel.cep = api_user.usua_cep;
        usuarioModel.dt_nasc = api_user.usua_dt_nasc;
        usuarioModel.numero_local = api_user.numero_local;

        return usuarioModel;
    }    
    
}