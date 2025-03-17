import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Autor } from '../models/autor.model';
import { Observable } from 'rxjs';

const baseUrlAutor = AppSettings.API_ENDPOINT + '/asignacionAutor';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private http: HttpClient) {}

  listaAutorDeLibro(id: string): Observable<Autor[]> {
    return this.http.get<Autor[]>(baseUrlAutor + '/listaAutorPorLibro/' + id);
  }
  registraAutor(idLibro: string, idAutor: string): Observable<any> {
    const params = new HttpParams()
      .set('idLibro', idLibro)
      .set('idAutor', idAutor);
    return this.http.get<Autor[]>(baseUrlAutor + '/registraAutor', {
      params,
    });
  }
  eliminaAutor(idLibro: string, idAutor: number): Observable<any> {
    const params = new HttpParams()
      .set('idLibro', idLibro)
      .set('idAutor', idAutor);
    return this.http.get<Autor[]>(baseUrlAutor + '/eliminaAutor', {
      params,
    });
  }
}
