import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs'

import { Persona } from '../interfaces/persona.interface';

import { environments } from 'src/app/environments/environments';

@Injectable({providedIn: 'root'})
export class AgendaService {

  private baseUrl : string = environments.baseURL;

  constructor(private http : HttpClient) { }

  getPersona() : Observable <Persona[]> {
    return this.http.get<Persona[]>(`${this.baseUrl}/persona`);
  }

  getPersonaById(id : string) : Observable<Persona | undefined>{
    return this.http.get<Persona>(`${this.baseUrl}/persona/${id}`)
      .pipe(
        catchError( error => of(undefined))
      );
  }

  addPersona (persona : Persona) : Observable <Persona>{
    return this.http.post<Persona>(`${this.baseUrl}/persona`, persona);
  }

  updatePersona (persona : Persona) : Observable <Persona>{

    if(!persona.id) throw Error('Persona Id es requerido');
    return this.http.patch<Persona>(`${this.baseUrl}/persona/${persona.id}`, persona);
  }

  deletePersonaById (persona : Persona) : Observable <Boolean>{

    return this.http.delete(`${this.baseUrl}/persona/${persona.id}`)
      .pipe(
        catchError( err => of(false) ),
        map( resp => true )
      );
  }

}
