import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('select') select!:ElementRef<HTMLSelectElement>;

  public terminoBusqueda: string = '';

  public numeroResultados: (number | string) = '';

  constructor (private gifsService: GifsService) {};

  buscar() {

    const tamanioGifs: string = this.select.nativeElement.value;

    this.gifsService.buscarGifs(this.terminoBusqueda, this.numeroResultados, tamanioGifs);

    this.terminoBusqueda = '';

    this.numeroResultados = '';

  };
};
