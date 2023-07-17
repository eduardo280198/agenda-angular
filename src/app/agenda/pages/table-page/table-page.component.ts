import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Persona } from '../../interfaces/persona.interface';
import { AgendaService } from '../../services/agenda.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'agenda-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent {

  public personaList : Persona[] = []

  private newItemSubscription    ?: Subscription;
  private updateItemSubscription ?: Subscription;
  private deleteItemSubscription ?: Subscription;

  // Angular Material - Tabla
  displayedColumns : string[] = ['name', 'lastName', 'cellPhone', 'address', 'acciones'];
  // dataSource : Persona[] = this.personaList;
  dataSource = new MatTableDataSource<Persona>();

  @ViewChild(MatSort) sort !: MatSort;

  constructor( private agendaService : AgendaService) {}

  ngAfterViewInit(){
    this.dataSource.sort = this.sort
  }

  ngOnInit(): void {

    this.getItems();

    this.newItemSubscription = this.agendaService.getNewItemObservable()
      .subscribe( () => {
        this.getItems();
      })

    this.updateItemSubscription = this.agendaService.getUpdateItemObservable()
      .subscribe( () => {
        this.getItems();
      })

    this.deleteItemSubscription = this.agendaService.getDeleteItemObservable().subscribe( () => {
      this.getItems();
    })

  }

  ngOnDestroy() : void {
    this.newItemSubscription?.unsubscribe();
    this.updateItemSubscription?.unsubscribe();
    this.deleteItemSubscription?.unsubscribe();
  }

  getItems() : void {
    this.agendaService.getPersona()
    .subscribe( personas => {
      this.personaList = personas;
      this.actualizarTabla(this.personaList)
    });
  }

  actualizarTabla( personas : Persona[] ){
    this.dataSource.data = personas;
  }

  //Metodo Para el filtro de Angular Material
  applyFilter(event : Event) : void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
