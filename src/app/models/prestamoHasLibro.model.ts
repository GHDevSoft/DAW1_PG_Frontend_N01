import { PrestamoHasLibroPK } from "./prestamoHasLibroPK.model";
import { Libro } from "./libro.model";

export class PrestamoHasLibro{

    fechaDevol?: Date;
    serie ?: string;
    anio ?: number;
    libro ?: Libro;
    prestamoHasLibroPK ?: PrestamoHasLibroPK;
}