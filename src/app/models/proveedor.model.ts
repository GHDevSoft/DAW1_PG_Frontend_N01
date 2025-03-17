import { DataCatalogo } from "./dataCatalogo.model";
import { Pais } from "./pais.model";
import { Usuario } from "./usuario.model";

export class Proveedor {
    idProveedor?:number;
    razonsocial?:string;
    ruc?:number;
    direccion?:string;
    telefono?:number;
    celular?:number;
    contacto?:string;
    estado?:number;
    pais?:Pais;
    tipoProveedor?:DataCatalogo;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}
