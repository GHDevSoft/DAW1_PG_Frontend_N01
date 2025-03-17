import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http:HttpClient) { }

  listaUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrlAutor);
  }
}
