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
        usuarioModel.cidade = api_user.cidade;
        usuarioModel.dt_nasc = api_user.usua_dt_nasc;
        usuarioModel.numero_local = api_user.numero_local;
        usuarioModel.onesignal_id = api_user.oneSignal_id;
        usuarioModel.facebook_id = api_user.facebook_id;
        usuarioModel.google_id = api_user.google_id;

        return usuarioModel;
    }  
    
    convertAPIUser(usuarioModel: UsuarioModel): any{
        let api_user: any = {};

        api_user.cpf = usuarioModel.cpf ? usuarioModel.cpf : '';
        api_user.rg = usuarioModel.rg ? usuarioModel.rg : '';
        api_user.nome = usuarioModel.nome ? usuarioModel.nome : '';
        api_user.senha = usuarioModel.senha ? usuarioModel.senha : '';
        api_user.email = usuarioModel.email ? usuarioModel.email : '';
        api_user.dt_nasc = usuarioModel.dt_nasc ? usuarioModel.dt_nasc : '';
        api_user.cep = usuarioModel.cep ? usuarioModel.cep : '';
        api_user.cidade = usuarioModel.cidade ? usuarioModel.cidade : '';
        api_user.logradouro = usuarioModel.logradouro ? usuarioModel.logradouro : '';
        api_user.bairro = usuarioModel.bairro ? usuarioModel.bairro : '';
        api_user.numero_local = usuarioModel.numero_local ? usuarioModel.numero_local : '';
        api_user.onesignal_id = usuarioModel.onesignal_id ? usuarioModel.onesignal_id : '';
        api_user.facebook_id = usuarioModel.facebook_id ? usuarioModel.facebook_id : '';
        api_user.google_id = usuarioModel.google_id ? usuarioModel.google_id : '';
        api_user.flag_ativo = usuarioModel.flag_ativo ? 1 : 0;

        return api_user;
    }   
    
    
    validaCPF(cpf): boolean {

        cpf = cpf.replace(/[\.-]/g, '');

        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;

        if (cpf.length < 11)
            return false;

        for (i = 0; i < cpf.length - 1; i++){
            if (cpf.charAt(i) != cpf.charAt(i + 1)){
                digitos_iguais = 0;
                break;
            }
        }

        if (!digitos_iguais){
        
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;

            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(0))
                return false;
            
            numeros = cpf.substring(0,10);
            soma = 0;

            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
           
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
           
            if (resultado != digitos.charAt(1))
                return false;

            return true;

        }else{

            return false;

        }
    }
    
}