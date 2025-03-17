import { Usuario } from "./usuario.model";
import { PrestamoHasLibro } from "./prestamoHasLibro.model";
import { Alumno } from "./alumno.model";

export class Prestamo{


    idPrestamo ?: number;
    alumno ?: Alumno;
    usuario ?: Usuario;
    detallesPrestamo ?: PrestamoHasLibro[];

}