import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-region.component.html'
})
export class PorRegionComponent  {
  
  keyword: string = '';
  tipoBusqueda: string = 'region';
  hayError: boolean = false;

  public paises: any = []
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = ''

  constructor( private paisesService: PaisesService ) { }

  activarRegion( region:string ){

    if (region === this.regionActiva) return 
    
    this.regionActiva = region;
    this.hayError = false
  
     this.paisesService.buscar(this.regionActiva, this.tipoBusqueda)
     .subscribe(  countries  => {
      console.log(countries);
        this.paises = countries;
       }, ( err ) => {
        this.hayError = true
        this.paises = [];
       })
  }

  getClaseCSS(region:string ):string{
    return (region === this.regionActiva)? 
      'btn btn-primary mr-1'
      : 'btn btn-outline-primary mr-1'
  }

  sugerencias( keyword: string  ){
    this.hayError = false
  }
}
