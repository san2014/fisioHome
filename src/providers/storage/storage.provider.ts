import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { UsuarioModel } from '../../model/usuario-model';


@Injectable()
export class StorageProvider {

  constructor(private cookieService: CookieService) {
  }

  setOneSignalId(id: string){
    this.cookieService.put('oneSignalId', id);
  }

  getOneSignalId(): string{
    return this.cookieService.get('oneSignalId');
  }
  
  getUsuarioSessao(): UsuarioModel{
    return <UsuarioModel> this.cookieService.getObject('usuarioLogado');
  }  

  setUsuarioSessao(usuario: UsuarioModel){
    this.cookieService.putObject('usuarioLogado', usuario)
  }  
  
  public setAccessToken(valor: string){
    this.cookieService.put('accessToken', valor)
  }
  
  public getAccessToken(): string{
    return this.cookieService.get('accessToken');
  }  
  
  clearCookies(){
    this.cookieService.removeAll();
  }  

}
