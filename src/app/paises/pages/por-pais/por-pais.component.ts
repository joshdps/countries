import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface.ts';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer
    };
  `]
})
export class PorPaisComponent  {
  
  keyword: string = ''
  tipoBusqueda: string = 'name'
  hayError: boolean = false;

  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  
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
