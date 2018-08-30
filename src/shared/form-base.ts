import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class FormBase implements OnInit{
  
  formulario: FormGroup;
  
  dependencias: any[] = [];

  constructor() { }

  async ngOnInit() {

    this.configurarForm();

    await this.inicializar();
  
    this.registrarDependencias();
  
    await this.carregarDependencias();

  }
  
  protected abstract inicializar();

  protected async registrarDependencias() {};

  protected async carregarDependencias(){

    for (let row of this.dependencias){

      const dep = await eval(`row.provider.${row.metodo}`);

      eval(`this.${row.prop} = ${JSON.stringify(dep)}`);

    }

  }

  protected configurarForm(){};
    
  protected aplicaCssErro(campo: string) {
    return {
      'box-register-error': this.hasError(campo),
      'box-register': this.hasSuccess(campo) || this.notUsed(campo)
    };
  }   

  protected notUsed(campo){
    return this.formulario.get(campo).pristine;
  }  

  protected hasSuccess(campo): boolean{
    return this.formulario.get(campo).valid;
  }  

  protected hasError(campo): boolean{
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }     

}