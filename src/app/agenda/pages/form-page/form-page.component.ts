import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { AgendaService } from '../../services/agenda.service';
import { Persona } from '../../interfaces/persona.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


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

  constructor(
    private agendaService : AgendaService,
    private activatedRoute : ActivatedRoute,
    public router : Router,
    private snackbar : MatSnackBar,
    private dialog : MatDialog
    ) {}

  get currentPersona() : Persona {
    const persona = this.agendaForm.value as Persona;
    return persona;
  }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.agendaService.getPersonaById( id ) ),
      ).subscribe( persona => {

        if ( !persona ){

          return this.router.navigateByUrl( '/' )
        }

        this.agendaForm.reset( persona )
        return;
      })
  }

  onSubmit () : void {


    // Si no se cumplen los valores requeridos del formulario, no hace nada, y retorna
    
    if ( this.agendaForm.invalid ) return;

    // Modifica un registro de bd.json
    if ( this.currentPersona.id){

      this.agendaService.updatePersona(this.currentPersona)
        .subscribe( persona => {

          this.router.navigate(['/']);
          this.showSnackbar(`${persona.name} ${persona.lastName} actualizado!!`);
        });

      return
    }

    // Agrega un registro a bd.json
    this.agendaService.addPersona ( this.currentPersona )
      .subscribe( persona => {

        this.agendaForm.reset({id: '', name: '', lastName: '', cellPhone: '', address: ''});
        this.showSnackbar(`${persona.name} ${persona.lastName} agregado!`);

      });

    // this.agendaService.updatePersona( this.agendaForm.value );
  }

  onDeletePersona() : void{
    if (!this.currentPersona.id) throw Error('Persona id es necesario');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.agendaForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if( !result ) return;

      this.agendaService.deletePersonaById( this.currentPersona.id )
        .subscribe( wasDeleted => {
          if( wasDeleted ){

            // Se supone que redirecciona, pero en esta ocasion no hace nah V:,
            this.router.navigate(['/'])
          }
        })
    });
  }


  showSnackbar( message : string) : void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }
}
