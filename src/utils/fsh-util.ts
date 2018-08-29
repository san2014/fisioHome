import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { UsuarioModel } from '../model/usuario-model';
import { isArray } from 'ionic-angular/util/util';

@Injectable()
export class FshUtils{

    constructor(
        private loadingCtrl: LoadingController
    ){}
    
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