import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Tesis } from '../models/tesis.model';

const baseUrlTesis = AppSettings.API_ENDPOINT + '/tesis';
const baseUrlCrudTesis = AppSettings.API_ENDPOINT + '/crudTesis';
const baseUrlConsultaTesis = AppSettings.API_ENDPOINT+ '/consultaTesis';

@Injectable({
  providedIn: 'root'
})
export class TesisService {

  constructor(private http: HttpClient) { }
 
  registrar(data: Tesis): Observable<any> {
    return this.http.post(baseUrlTesis, data);  }

  //CRUD
  registrarCrud(data: Tesis): Observable<any> {
    return this.http.post(baseUrlCrudTesis + "/registraTesis", data);
  }
  actualizarCrud(data: Tesis): Observable<any> {
    return this.http.put(baseUrlCrudTesis + "/actualizaTesis", data);
  }
  eliminarCrud(id: number): Observable<any> {
    return this.http.delete(baseUrlCrudTesis + "/eliminaTesis/" + id);
  }
  consultarCrud(filtro: string): Observable<any> {
    return this.http.get(baseUrlCrudTesis + "/listaTesisPorTituloLike/" + filtro);
  }


  //CONSULTA
  consultarTesisComplejo(tit:string, desde:string, hasta:string, est:number, tem:number, idi:number, cen:number):Observable<any>{
    const params = new HttpParams()
    .set("titulo", tit)
    .set("fecDesde", desde)
    .set("fecHasta", hasta)
    .set("estado", est)
    .set("idTema", tem)
    .set("idIdioma", idi)
    .set("idCentroEstudios", cen);

    return this.http.get(baseUrlConsultaTesis+"/consultaTesisPorParametros", {params});
  }


}

