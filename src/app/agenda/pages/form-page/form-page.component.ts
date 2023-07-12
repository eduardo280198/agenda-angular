import { Component, EventEmitter, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { AgendaService } from '../../services/agenda.service';
import { Persona } from '../../interfaces/persona.interface';


@Component({
  selector: 'agenda-form-page',
  templateUrl: './form-page.component.html',
  styles: [ "mat-form-field: {width: 100%}"]
})
export class FormPageComponent implements OnInit {

  // Inicialización del formulario reactivo
  public agendaForm = new FormGroup({
    id        : new FormControl(''),
    name      : new FormControl('', { nonNullable : true }),
    lastName  : new FormControl('', { nonNullable : true }),
    cellPhone : new FormControl('', { nonNullable : true }),
    address   : new FormControl('', { nonNullable : true })
  });

  constructor( private agendaService : AgendaService) {}

  get currentPersona() : Persona {
    const persona = this.agendaForm.value as Persona;
    return persona;
  }

  ngOnInit(): void {
      
  }

  onSubmit () : void {

    // Si no se cumplen los valores requeridos del formulario, no hace nada, y retorna
    if ( this.agendaForm.invalid ) return;

    // Modifica un registro de bd.json
    if ( this.currentPersona.id){

      this.agendaService.updatePersona(this.currentPersona)
        .subscribe( persona => {
          // TODO: mostrar snackbar
        });

      return
    }

    // Agrega un registro a bd.json
    this.agendaService.addPersona ( this.currentPersona )
      .subscribe( persona => {
        //TODO: mostrar snackbar
      });

    // this.agendaService.updatePersona( this.agendaForm.value );
  }
}
