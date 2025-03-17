import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Rol } from '../models/rol.model';
import { Opcion } from '../models/opcion.model';

const baseUrlUtil = AppSettings.API_ENDPOINT + '/asignacionOpcion';

@Injectable({
  providedIn: 'root'
})

export class OpcionService {

  constructor(private http: HttpClient) { }

  listaOpcionDeRol(id: string): Observable<Opcion[]> {
    return this.http.get<Opcion[]>(baseUrlUtil + "/listaOpcionPorRol/" + id);
  }

  registraOpcion(idRol: string, idOpcion: string): Observable<any> {
    const params = new HttpParams()
      .set("idRol", idRol)
      .set("idOpcion", idOpcion)
    return this.http.get<Opcion[]>(baseUrlUtil + "/registraOpcion", { params });
  }

  eliminaOpcion(idRol: string, idOpcion: number): Observable<any> {
    const params = new HttpParams()
      .set("idRol", idRol)
      .set("idOpcion", idOpcion)
    return this.http.get<Opcion[]>(baseUrlUtil + "/eliminaOpcion", { params });
  }

}


