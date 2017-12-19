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
        usuarioModel.oneSignalId = api_user.oneSignalId;

        return usuarioModel;
    }  
    
    convertAPIUser(usuarioModel: UsuarioModel): any{
        let api_user: any = {};

        //api_user.usua_id = usuarioModel.id ? usuarioModel.id : '';
        api_user.cpf = usuarioModel.cpf ? usuarioModel.cpf : '000';
        api_user.rg = usuarioModel.rg ? usuarioModel.rg : '000';
        api_user.nome = usuarioModel.nome ? usuarioModel.nome : '';
        api_user.senha = usuarioModel.senha ? usuarioModel.senha : '';
        api_user.email = usuarioModel.email ? usuarioModel.email : '';
        api_user.dt_nasc = usuarioModel.dt_nasc ? usuarioModel.dt_nasc : '';
        api_user.cep = usuarioModel.cep ? usuarioModel.cep : '';
        api_user.logradouro = usuarioModel.logradouro ? usuarioModel.logradouro : '';
        api_user.bairro = usuarioModel.bairro ? usuarioModel.bairro : '';
        api_user.numero_local = usuarioModel.numero_local ? usuarioModel.numero_local : '';
        api_user.oneSignalId = usuarioModel.oneSignalId ? usuarioModel.oneSignalId : '';
        api_user.flag_ativo = usuarioModel.flag_ativo ? 1 : 0;

        return api_user;
    }      
    
}