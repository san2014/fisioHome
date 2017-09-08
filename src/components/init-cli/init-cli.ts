import { Component, Input, EventEmitter, Output } from '@angular/core';

import { TipoAtendimentoModel } from "../../model/tipoatendimento-model";

@Component({
  selector: 'init-cli',
  templateUrl: 'init-cli.html'
})
export class InitCliComponent {

  @Input()
  tpsAtds: TipoAtendimentoModel[];

  @Output()
  tpAtdSelect = new EventEmitter<TipoAtendimentoModel>()

  constructor() {}

  initProposta(tipoAtendimento: TipoAtendimentoModel){
    //console.log(tipoAtendimento);
    this.tpAtdSelect.emit(tipoAtendimento);
  }  

}
