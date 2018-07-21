import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLoginResponse, Facebook } from '@ionic-native/facebook';

import { ErrorHandler } from '../../app/app-error-handler';

import { UserProvider } from '../user/user.provider';

import { UsuarioModel } from '../../model/usuario-model';
import { Perfil } from '../../model/perfil.model';
import { PerfilEnum } from '../../enum/perfil-enum';

@Injectable()
export class FacebookProvider {

  constructor(
    public http: HttpClient,
    public facebook: Facebook
  ) {}


  async login(): Promise<UsuarioModel>{

    try {

      const credentials = await this.authFace()
        .catch(() => {
          throw new Error();  
        });
        
      const userFace: any = await this.getUserFace(credentials.authResponse.userID)
        .catch(() => {
          throw new Error();          
        });    

      if (userFace){
        
        let usuarioModel = new UsuarioModel();

        usuarioModel.nome = userFace.name;
        usuarioModel.email = userFace.email;
        usuarioModel.nascimento = userFace.birthday;
        usuarioModel.imgPerfil = userFace.picture.data.url;
        usuarioModel.sexo = userFace.gender == 'male' ? true : false;
        usuarioModel.perfil = new Perfil();
        usuarioModel.perfil.id = PerfilEnum.ROLE_CLIENTE;        
        
        return Promise.resolve(usuarioModel);

      }else{

        throw new Error('Facebook: falha na validação!');

      }

    } catch (error) {
      
      return Promise.reject(ErrorHandler.handlerError(error));

    }

  }

  private authFace(): Promise<FacebookLoginResponse>{

    return new Promise<FacebookLoginResponse>((resolve, reject) => { 

      this.facebook.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });

    });   

  }    

  private getUserFace(userid) {

    return new Promise ((resolve, reject) => {

      this.facebook.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
        .then(profile => {
          resolve(profile);
        })
        .catch((error)=> {
          reject(error);
        });

    });

  } 


}
