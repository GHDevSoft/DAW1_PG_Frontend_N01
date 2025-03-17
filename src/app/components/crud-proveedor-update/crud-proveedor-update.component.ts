import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Proveedor } from '../../models/proveedor.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { ProveedorService } from '../../services/proveedor.service';
import { TokenService } from '../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-proveedor-update',
  templateUrl: './crud-proveedor-update.component.html',
  styleUrls: ['./crud-proveedor-update.component.css']
})
export class CrudProveedorUpdateComponent {
  lstPais: Pais[] = [];
  lstTipo: DataCatalogo[] = [];

  objProveedor: Proveedor ={
    razonsocial: "",
    ruc: 0,
    direccion : "",
    telefono: 0,
    celular:0,
    contacto:"",
    
    pais:{
      idPais:-1
    },
    tipoProveedor:{
        idDataCatalogo:-1
    },
    
}
objUsuario: Usuario = {} ;

constructor(private paisService:UtilService,private dataCatalogoService:UtilService,
  private proveedorService:ProveedorService,
  private tokenService: TokenService,
  @Inject(MAT_DIALOG_DATA) public data: any){
    this.objProveedor = data;
    this.paisService.listaPais().subscribe(
      x=> this.lstPais = x
    )
    this.dataCatalogoService.listaTipoProveedor().subscribe(
      x=> this.lstTipo = x
    )
    

    this.objUsuario.idUsuario = tokenService.getUserId();
   }

   actualiza(){
    this.objProveedor.usuarioActualiza = this.objUsuario;
    this.objProveedor.usuarioRegistro = this.objUsuario;
    this.proveedorService.actualizarCrud(this.objProveedor).subscribe(
        x =>  Swal.fire({icon: 'info',title: 'Resultado del Registro',text: x.mensaje}) 
    );
  }
  
}
