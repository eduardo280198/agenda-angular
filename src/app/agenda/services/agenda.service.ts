import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap } from 'rxjs'

import { Persona } from '../interfaces/persona.interface';

import { environments } from 'src/app/environments/environments';

@Injectable({providedIn: 'root'})
export class AgendaService {

  private baseUrl : string = environments.baseURL;

  private newItemSubject    = new Subject<Persona>()
  private updateItemSubject = new Subject<Persona>()
  private deleteItemSubject = new Subject<any>()

  constructor(private http : HttpClient) { }

  // Obtener todos los registros de db.js
  getPersona() : Observable <Persona[]> {
    return this.http.get<Persona[]>(`${this.baseUrl}/agenda`);
  }

  // Se hace una peticion para obtener solo un registro dependiendo del id
  getPersonaById(id : string) : Observable<Persona | undefined>{
    return this.http.get<Persona>(`${this.baseUrl}/agenda/${id}`)
      .pipe(
        catchError( error => of(undefined))
      );
  }


  addPersona (persona : Persona) : Observable <Persona>{
    return this.http.post<Persona>(`${this.baseUrl}/agenda`, persona)
      .pipe(
        tap( () => this.newItemSubject.next(persona))
      );
  }

  updatePersona (persona : Persona) : Observable <Persona>{

    if(!persona.id) throw Error('Persona Id es requerido');
    return this.http.patch<Persona>(`${this.baseUrl}/agenda/${persona.id}`, persona)
      .pipe(
        tap( () => this.updateItemSubject.next(persona) )
      );
  }

  deletePersonaById ( id : string) : Observable <Boolean>{

    return this.http.delete(`${this.baseUrl}/agenda/${id}`)
      .pipe(
        catchError( err => of(false) ),
        map( resp => true )
      )
      .pipe(
        tap( () => this.deleteItemSubject.next(id))
      );
  }

  getNewItemObservable() : Observable<Persona>{
    return this.newItemSubject.asObservable();
  }

  getUpdateItemObservable() : Observable<Persona>{
    return this.updateItemSubject.asObservable();
  }

  getDeleteItemObservable() : Observable <Persona> {
    return this.deleteItemSubject.asObservable();
  }

}
