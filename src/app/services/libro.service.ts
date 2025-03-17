import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Libro } from '../models/libro.model';
import { Observable } from 'rxjs';

const baseUrlLibro = AppSettings.API_ENDPOINT + '/libro';
const baseUrlCrudLibro = AppSettings.API_ENDPOINT + '/crudLibro';
const baseUrlConsultaLibro = AppSettings.API_ENDPOINT+ '/consultaLibro'

//T3
const baseUrl =  AppSettings.API_ENDPOINT + "/prestamoLibro";

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }
  //PC1 REGISTRAR
  registro(data:Libro):Observable<any> {
    return this.http.post(baseUrlLibro, data)
  }
  gistro(data:Libro):Observable<any> {
    return this.http.post(baseUrlLibro, data)
  }

  consultarCrud(filtro:string):Observable<any> {
    return this.http.get(baseUrlCrudLibro+"/listaLibroPorTituloLike/"+filtro);
  }
  registrarCrud(data:Libro):Observable<any> {
    return this.http.post(baseUrlCrudLibro+"/registraLibro", data);
  }
  actualizarCrud(data:Libro):Observable<any>{
    return this.http.put(baseUrlCrudLibro+"/actualizaLibro", data);
  }
  eliminaCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudLibro+"/eliminaLibro/" + id);
  }
  //EF-- CONSULTA
  consultarLibroComplejo(titulo:string,estado:number, tipo:number, categoria:number):Observable<any>{
    const params = new HttpParams()
    .set("titulo", titulo)
    .set("estado", estado)
    .set("idTipo", tipo)
    .set("idCategoria", categoria);

    return this.http.get(baseUrlConsultaLibro+"/consultaLibroPorParametros", {params});
  }

  //T3
  consultaFiltro(filtro:string, page: number, size: number):Observable<Libro[]>{
      return  this.http.get<Libro[]>(baseUrl +'/listaLibro/'+filtro+'?page='+ page+'&size=' + size); 
  }
}  

