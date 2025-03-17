import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Proveedor } from '../models/proveedor.model';
import { Observable } from 'rxjs';

const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';
const baseUrlCrudProveedor = AppSettings.API_ENDPOINT+ '/crudProveedor';
const baseUrlConsultaProveedor = AppSettings.API_ENDPOINT+ '/consultaProveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient) { }
  registrarProveedor(data:Proveedor):Observable<any>{
    return this.http.post(baseUrlProveedor, data);
  }

  registrarCrud(data:Proveedor):Observable<any>{
    return this.http.post(baseUrlCrudProveedor+"/registraProveedor", data);
  }
  actualizarCrud(data:Proveedor):Observable<any>{
    return this.http.put(baseUrlCrudProveedor+"/actualizaProveedor", data);
  }
  eliminarCrud(id:Number):Observable<any>{
    return this.http.delete(baseUrlCrudProveedor+"/eliminaProveedor/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudProveedor+"/listaProveedorPorNombreLike/"+ filtro);
  }

consultarProveedorComplejo(raz:string, ruc:string, est:number, cel:string, con:string, p:number, t:number):Observable<any>{
  const params = new HttpParams()
  .set("razonsocial", raz)
  .set("ruc", ruc)
  .set("estado", est)
  .set("celular", cel)
  .set("contacto", con)
  .set("idPais", p)
  .set("idTipo", t)

  return this.http.get(baseUrlConsultaProveedor+"/consultaProveedorPorParametros", {params});
}
}
