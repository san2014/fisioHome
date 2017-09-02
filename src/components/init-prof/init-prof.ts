import { TipoAtendimentoProvider } from './../../providers/tipo-atendimento/tipo-atendimento.provider';
import { Component } from '@angular/core';

import { ProfissionalModel } from './../../model/profissional-model';

@Component({
  selector: 'init-prof',
  templateUrl: 'init-prof.html'
})
export class InitProfComponent {

  profissional: ProfissionalModel

  constructor(
    private tipoAtendimentoProvider: TipoAtendimentoProvider
  ) {
  }

  check(){
    this.tipoAtendimentoProvider.tiposAtendimentos().then(() => console.log('ok'));
  }

}
