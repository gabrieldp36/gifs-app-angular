import { Component} from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {};

  get historial(): string[] {

    return this.gifsService.historial;
  };

  borrar() {

    this.gifsService.borrarHistorial();
  };

  buscar (termino: string) {

    this.gifsService.buscarGifs(termino);
  };
};
