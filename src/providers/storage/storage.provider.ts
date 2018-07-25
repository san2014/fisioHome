import { Injectable } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { UsuarioModel } from '../../model/usuario-model';
import { NotificacaoModel } from './../../model/notificacao-model';


@Injectable()
export class StorageProvider {

  constructor(private cookieService: CookieService) {
  }

  public setOneSignalId(id: string){
    this.cookieService.put('oneSignalId', id);
  }

  public getOneSignalId(): string{
    return this.cookieService.get('oneSignalId');
  }
  
  public getUsuarioSessao(): UsuarioModel{
    return <UsuarioModel> this.cookieService.getObject('usuarioLogado');
  }  

  public setUsuarioSessao(usuario: UsuarioModel){
    this.cookieService.putObject('usuarioLogado', usuario)
  }  
  
  public setAccessToken(valor: string){
    this.cookieService.put('accessToken', valor)
  }
  
  public getAccessToken(): string{
    return this.cookieService.get('accessToken');
  }  

  public getNotificacoes(): Array<NotificacaoModel> {
    return <Array<NotificacaoModel>> this.cookieService.getObject('notificacoes');
  }

  public setNotificacoes(notificacoes: Array<NotificacaoModel>) {
    this.cookieService.putObject('notificacoes', notificacoes);
  }  

  public clearNotificacoes(){
    this.cookieService.putObject('notificacoes', new Array<NotificacaoModel>());
  }    
  
  public clearCookies(){
    this.cookieService.removeAll();
  }  

}
