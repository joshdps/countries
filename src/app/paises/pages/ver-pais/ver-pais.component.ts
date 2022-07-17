import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PaisesService } from '../../services/paises.service';

import { Country } from '../../interfaces/country.interface.ts';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  tipoBusqueda = 'alpha';
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisesService.buscar(id, this.tipoBusqueda)),
        tap( console.log )
      )
      .subscribe(pais => this.pais = pais)
  }


}
