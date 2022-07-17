import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface.ts';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  buscar(  keyword: string, tipoBusqueda: string ): Observable<Country[]>{
    const params = new HttpParams()
      .set('fields','name,capital,flags,population,cca2,cca3,ccn3,translations');

    const url = `${this.apiUrl}/${tipoBusqueda}/${keyword}`;
    return this.http.get<Country[]>(url, {params})
    
  }

 
}

