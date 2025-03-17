import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Alumno } from '../models/alumno.model';
import { Pais } from '../models/pais.model';
import { DataCatalogo } from '../models/dataCatalogo.model';
import { Usuario } from '../models/usuario.model';

import { Libro } from '../models/libro.model';
import { Autor } from '../models/autor.model';
import { Editorial } from '../models/Editorial.model';

import { Rol } from '../models/rol.model';
import { Opcion } from '../models/opcion.model';


const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private http: HttpClient) {}

  listaPais(): Observable<Pais[]> {
    return this.http.get<Pais[]>(baseUrlUtil + '/listaPais');
  }

  listaAlumno(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(baseUrlUtil + '/listaAlumno');
  }

  listaCategoriaDeLibro(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(
      baseUrlUtil + '/listaCategoriaDeLibro'
    );
  }

  listaTipoProveedor(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaTipoProveedor');
  }

  listaModalidadAlumno(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaModalidadAlumno');
  }

  listaGradoAutor(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaGradoAutor');
  }

  listaTipoLibroRevista(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(
      baseUrlUtil + '/listaTipoLibroRevista'
    );
  }

  listaTipoSala(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaTipoSala');
  }

  listaSede(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaSede');
  }

  listaEstadoReserva(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaEstadoReserva');
  }

  //Agregado
  listaCentroEstudio(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaCentroEstudio');
  }

  listaIdioma(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaIdioma');
  }

  listaTemaTesis(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaTemaTesis');
  }

  listaEstadoPrestamo(): Observable<DataCatalogo[]> {
    return this.http.get<DataCatalogo[]>(baseUrlUtil + '/listaEstadoLibro');
  }
  listaEditorial(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(AppSettings.API_ENDPOINT + '/libro');
  }



  //Asignación de Opción
  listaOpcion(): Observable<Opcion[]> {
    return this.http.get<Opcion[]>(baseUrlUtil + "/listaOpcion");
  }

  //ASIGNACION ROL PC3 
  listaUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(baseUrlUtil + '/listaUsuario');
  }
  listaRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(baseUrlUtil + '/listaRol');
  }

  //ASIGNACION AUTOR
  listaLibro(): Observable<Libro[]> {
    return this.http.get<Libro[]>(baseUrlUtil + '/listaLibro');
  }

  listaAutor(): Observable<Autor[]> {
    return this.http.get<Autor[]>(baseUrlUtil + '/listaAutor');
  }

}
