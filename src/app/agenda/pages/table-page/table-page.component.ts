import { Component } from '@angular/core';
import { Persona } from '../../interfaces/persona.interface';
import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'agenda-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent {

  public personaList : Persona[] = []

  constructor( private agendaService : AgendaService) {}

  ngOnInit(): void {
    this.agendaService.getPersona()
    .subscribe( personas => this.personaList = personas);

  }

  // Angular Material - Tabla
  displayedColumns : string[] = ['name', 'lastName', 'cellPhone', 'address'];
  dataSource : Persona[] = this.personaList;

  //Metodo Para el filtro de Angular Material
  applyFilter(event : Event) : void{
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
