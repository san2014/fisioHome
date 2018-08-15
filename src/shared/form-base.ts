import { FormGroup } from '@angular/forms';

import { FshUtils } from './../utils/fsh-util';
import { Injector } from '@angular/core';

export abstract class FormBase {

    formulario: FormGroup;

    aplicaCssErro(campo: string) {
        return {
          'box-register-error': this.hasError(campo),
          'box-register': this.hasSuccess(campo) || this.notUsed(campo)
        };
      }   
    
      notUsed(campo){
        return this.formulario.get(campo).pristine;
      }  
    
      hasSuccess(campo): boolean{
        return this.formulario.get(campo).valid;
      }  
      
      hasError(campo): boolean{
        return (
          !this.formulario.get(campo).valid &&
          (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
        );
      }     

}