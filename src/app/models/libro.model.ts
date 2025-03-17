import { Editorial } from "./Editorial.model";
import { DataCatalogo } from "./dataCatalogo.model";
import { Usuario } from "./usuario.model";


export class Libro {

  idLibro?: number;
  titulo?: string;
  anio?: number;
  serie?: string;
  categoriaLibro?: DataCatalogo;
  estadoPrestamo?: DataCatalogo;
  tipoLibro?: DataCatalogo;
  editorial?: Editorial;
  usuarioRegistro?: Usuario;
  usuarioActualiza?: Usuario;
  estado?:number;

  fechaDevolucion?: Date;
}

