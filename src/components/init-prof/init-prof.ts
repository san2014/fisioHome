import { Component } from '@angular/core';

import { ProfissionalModel } from './../../model/profissional-model';

@Component({
  selector: 'init-prof',
  templateUrl: 'init-prof.html'
})
export class InitProfComponent {

  profissional: ProfissionalModel

  constructor() {
  }

}
