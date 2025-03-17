import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sala } from '../models/sala.model';
import { Observable } from 'rxjs';

const baseUrlSala = AppSettings.API_ENDPOINT+ '/sala';
const baseUrlCrudSala = AppSettings.API_ENDPOINT+ '/crudSala';
const baseUrlConsultaSala = AppSettings.API_ENDPOINT+ '/consultaSala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http:HttpClient) { }

  registrar(data:Sala):Observable<any>{
    return this.http.post(baseUrlSala, data);
  }

  //PC2-CRUD

  registrarCrud(data: Sala): Observable<any> {
    return this.http.post(baseUrlCrudSala + "/registraSala", data);
  }
  actualizarCrud(data: Sala): Observable<any> {
    return this.http.put(baseUrlCrudSala + "/actualizaSala", data);
  }
  eliminarCrud(id: number): Observable<any> {
    return this.http.delete(baseUrlCrudSala + "/eliminaSala/" + id);
  }
  consultarCrud(filtro: string): Observable<any> {
    return this.http.get(baseUrlCrudSala + "/listaSalaPorNumeroLike/" + filtro);
  }

  //Consultas
  consultarSalaComplejo(num:string, est:number, ts:number , s:number, er:number):Observable<any>{
    const params = new HttpParams()
    .set("numero", num)
    .set("estado", est)
    .set("idTipoSala", ts)
    .set("idSede", s)
    .set("idEstadoReserva", er);

  return this.http.get(baseUrlConsultaSala+"/consultaSalaPorParametros", {params});
  }
}
