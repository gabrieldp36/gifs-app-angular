import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { GifsPageComponent } from './components/gifs-page/gifs-page.component';

import { BusquedaComponent } from './components/busqueda/busqueda.component';

import { ResultadosComponent } from './components/resultados/resultados.component';

@NgModule({
  declarations: [

    GifsPageComponent,
     BusquedaComponent,
     ResultadosComponent,
  ],
  exports: [

    GifsPageComponent,
  ],
  imports: [

    CommonModule,
    FormsModule,
  ],
})
export class GifsModule { };
