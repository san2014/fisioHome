import { Component, Input } from '@angular/core';

import { UsuarioModel } from "../../model/usuario-model";

@Component({
  selector: 'init-prof',
  templateUrl: 'init-prof.html'
})
export class InitProfComponent {

  @Input()
  usuario: UsuarioModel

  constructor() {
  }
}
