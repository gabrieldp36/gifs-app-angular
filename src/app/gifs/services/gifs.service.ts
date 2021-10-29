import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'JQJnsi6GECHPzcpnmWYTPc2ZOSRo22Xu';

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs/search';

  private _historialSinEspacios: string[] = [];

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  public numeroResultados: (number | string) = 0;

  public tamanioGifs: string = '';

  get historial (): string[] {

    return [...this._historial];
  };

  constructor(private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];

    this._historialSinEspacios = JSON.parse( localStorage.getItem('historialSinEspacios')!) || [];

    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

    this.tamanioGifs = JSON.parse( localStorage.getItem('tamanioGifs')!) || '';
  };

  buscarGifs(termino: string, numeroResultados?: (number | string), tamanioGifs?: string ) {

    this.tamanioGifs = tamanioGifs || 'medium';

    this.numeroResultados = !(numeroResultados) ? 10 : numeroResultados;

    termino = termino.trim().toLocaleLowerCase();

    const textoCortado: string[] = termino.split(' ');

    const terminoBusqueda: string = textoCortado.join('');

    localStorage.setItem('tamanioGifs', JSON.stringify(this.tamanioGifs) );

    // Historial de búsqueda.

    if ( terminoBusqueda.length > 0 && !this._historialSinEspacios.includes(terminoBusqueda) ) {

      this._historialSinEspacios.unshift(terminoBusqueda);

      this._historial.unshift(termino);

      this._historialSinEspacios = this._historialSinEspacios.splice(0,10);

      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );

      localStorage.setItem('historialSinEspacios', JSON.stringify(this._historialSinEspacios) );
    };

    // Búsqueda de gifs.
    
    if (terminoBusqueda.length > 0) {

      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('q', termino)
        .set('limit', `${this.numeroResultados}`)
        .set('lang', 'es')

      this.http.get<SearchGifsResponse>( this.servicioUrl, {params} )
      .subscribe( respuesta => {

        this.resultados = respuesta.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados) );
      });
    };
  };

  borrarHistorial () {

    this._historialSinEspacios = [];

    this._historial = [];

    this.resultados = [];

    this.tamanioGifs = '';

    localStorage.clear();
  };
};
