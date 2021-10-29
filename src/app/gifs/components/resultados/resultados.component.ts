import { Component } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {

  constructor (private gifsService: GifsService) {};

  get resultados (): Gif[] {

    return this.gifsService.resultados;
  };

  get tamanioGifs (): string {

    return this.gifsService.tamanioGifs;
  };
};
