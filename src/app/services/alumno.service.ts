import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alumno } from '../models/alumno.model';
import { Observable } from 'rxjs';

const baseUrlAlumno = AppSettings.API_ENDPOINT + '/alumno';
const baseUrlCrudAlumno = AppSettings.API_ENDPOINT + '/crudAlumno';
const baseUrlConsultaAlumno = AppSettings.API_ENDPOINT + '/consultaAlumno';

//T3
const baseUrl =  AppSettings.API_ENDPOINT + "/prestamoLibro";

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  constructor(private http: HttpClient) {}

  registrar(data: Alumno): Observable<any> {
    return this.http.post(baseUrlAlumno, data);
  }

  //PC2 - CRUD
  registrarCrud(data: Alumno): Observable<any> {
    return this.http.post(baseUrlCrudAlumno + '/registraAlumno', data);
  }
  actualizarCrud(data: Alumno): Observable<any> {
    return this.http.put(baseUrlCrudAlumno + '/actualizaAlumno', data);
  }
  eliminarCrud(id: number): Observable<any> {
    return this.http.delete(baseUrlCrudAlumno + '/eliminaAlumno/' + id);
  }
  consultarCrud(filtro: string): Observable<any> {
    return this.http.get(
      baseUrlCrudAlumno + '/listaAlumnoPorNombreLike/' + filtro
    );
  }

  //T3
  consultaFiltro(filtro:string, page: number, size: number):Observable<Alumno[]>{
      return  this.http.get<Alumno[]>(baseUrl +'/listaAlumno/'+filtro+'?page='+ page+'&size=' + size); 
  }
   

  consultarAlumnoComplejo(
    nom: string,
    dni: string,
    desde: string,
    hasta: string,
    est: number,
    p: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('nombres', nom)
      .set('dni', dni)
      .set('fecDesde', desde)
      .set('fecHasta', hasta)
      .set('estado', est)
      .set('idPais', p);

    return this.http.get(
      baseUrlConsultaAlumno + '/consultaAlumnoPorParametros',
      { params }
    );
  }

}
