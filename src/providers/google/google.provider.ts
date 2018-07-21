import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

import { FshUtils } from '../../utils/fsh-util';

import { UsuarioModel } from '../../model/usuario-model';
import { Perfil } from '../../model/perfil.model';
import { PerfilEnum } from '../../enum/perfil-enum';
import { ErrorHandler } from '../../app/app-error-handler';


@Injectable()
export class GoogleProvider {

  constructor(
    private googlePlus: GooglePlus,
    private fshUtils: FshUtils
  ) {
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

  async login(): Promise<UsuarioModel>{

    try {

      let userGoogle: any = await this.getDataGoogle()
        .catch((error) => {
          throw new Error(error);          
        });

      if (userGoogle){

        let usuarioModel = new UsuarioModel();

        usuarioModel.nome = userGoogle.displayName;
        usuarioModel.email = userGoogle.email;
        usuarioModel.imgPerfil = userGoogle.imageUrl;  
        usuarioModel.googleId = userGoogle.id;
        usuarioModel.perfil = new Perfil();
        usuarioModel.perfil.id = PerfilEnum.ROLE_CLIENTE;
        usuarioModel.senha = this.fshUtils.generatePass(usuarioModel.nome);  

        return Promise.resolve(usuarioModel);
        
      }else{

        throw new Error('Google: falha na comunicação!');

      }

    } catch (error) {
      
      return Promise.reject(ErrorHandler.handlerError(error));

    }

  }

}
