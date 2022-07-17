import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface.ts';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent  {
  
  keyword: string = ''
  tipoBusqueda: string = 'capital'
  hayError: boolean = false;
  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  public paises: any = []
  
  constructor( private paisesService: PaisesService ) { }

  buscar( keyword: string ){
    this.hayError = false
    this.mostrarSugerencias = false;
    this.keyword = keyword;
     this.paisesService.buscar(keyword, this.tipoBusqueda)
     .subscribe(  countries  => {
        this.paises = countries;
       }, ( err ) => {
        this.hayError = true
        this.paises = [];
       })
  }

  sugerencias( keyword: string  ){
    this.hayError = false
    this.keyword = keyword;

    this.mostrarSugerencias = true;

    this.paisesService.buscar( keyword,this.tipoBusqueda)
    .subscribe( countries => 
      this.paisesSugeridos = countries.splice(0,5)),
      (err: Error) => this.paisesSugeridos = []
  }

  buscarSugeridos(keyword: string){
    this.buscar(keyword);

  }
}
