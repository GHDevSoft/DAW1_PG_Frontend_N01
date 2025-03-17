import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { UtilService } from '../../services/util.service';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import Swal from 'sweetalert2';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { TokenService } from '../../security/token.service';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent  {

  listPais : Pais[] = [];
  listaTipo : DataCatalogo[] = [];
  listUsuario : Usuario[] = [];
  objUsuario: Usuario = {} ;

  constructor(private paisService:UtilService,private dataCatalogoService:UtilService,
    private usuarioService:UsuarioService,
    private proveedorService:ProveedorService,
    private tokenService: TokenService,private formBuilder : FormBuilder) {
    this.paisService.listaPais().subscribe(
      x=> this.listPais = x
    )
    this.dataCatalogoService.listaTipoProveedor().subscribe(
      x=> this.listaTipo = x
    )
    this.usuarioService.listaUsuario().subscribe(
      x=> this.listUsuario = x 
    )

    this.objUsuario.idUsuario = tokenService.getUserId();
   }


   formsRegistra = this.formBuilder.group({ 
    validaRazon: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9á-úÁ-ÚñÑ ]{3,120}')]] , 
    validaRuc: ['', [Validators.required, Validators.pattern('[0-9]{11}')]] ,
    validaDireccion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9á-úÁ-ÚñÑ ]{8,120}')]] , 
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{7}')]] , 
    validaCelular: ['', [Validators.required, Validators.pattern('[0-9]{9}')]] , 
    validaContacto: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,120}')]] , 
    validaPais: ['', Validators.min(1)] , 
    validaTipoProveedor: ['', Validators.min(1)] 
      });

  objProveedor : Proveedor ={
    razonsocial : "",
    ruc : 0,
    direccion : "",
    telefono : 0,
    celular : 0,
    contacto : "",
    pais:{
      idPais : -1
    },
    tipoProveedor:{
      idDataCatalogo : -1
    },
    usuarioRegistro:{
      idUsuario : -1
    },
    usuarioActualiza:{
      idUsuario : -1
    }
  }
  inserta(){
    if(this.formsRegistra.valid){
      this.objProveedor.usuarioActualiza = this.objUsuario;
    this.objProveedor.usuarioRegistro = this.objUsuario;
    this.proveedorService.registrarProveedor(this.objProveedor).subscribe(
        x =>{ 
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: x,
          });
          
          this.formsRegistra.reset();
        
          Object.keys(this.formsRegistra.controls).forEach(x =>{
            this.formsRegistra.get(x)?.setErrors(null);
          })
        }
    );
    }
    
  }
}
