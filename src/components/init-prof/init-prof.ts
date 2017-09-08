import { TipoAtendimentoProvider } from './../../providers/tipo-atendimento/tipo-atendimento.provider';
import { Component, Input } from '@angular/core';

import { UsuarioModel } from "../../model/usuario-model";

@Component({
  selector: 'init-prof',
  templateUrl: 'init-prof.html'
})
export class InitProfComponent {

  @Input()
  usuario: UsuarioModel

  constructor(
    private tipoAtendimentoProvider: TipoAtendimentoProvider
  ) {
  }
}
