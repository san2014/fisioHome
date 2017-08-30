import { Component, Input } from '@angular/core';

import { TipoAtendimentoModel } from "../../model/tipoatendimento-model";

@Component({
  selector: 'init-cli',
  templateUrl: 'init-cli.html'
})
export class InitCliComponent {

  @Input()
  tpsAtds: TipoAtendimentoModel;

  constructor() {}

}
