import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import Swal from 'sweetalert2';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Proveedor } from '../../models/proveedor.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  standalone: true,
  selector: 'app-crud-proveedor-add',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  templateUrl: './crud-proveedor-add.component.html',
  styleUrls: ['./crud-proveedor-add.component.css']
})
export class CrudProveedorAddComponent {
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

  lstPais:Pais[] = [];
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
  private proveedorService:ProveedorService,private formBuilder : FormBuilder,
  private tokenService: TokenService){
    this.paisService.listaPais().subscribe(
      x=> this.lstPais = x
    )
    this.dataCatalogoService.listaTipoProveedor().subscribe(
      x=> this.lstTipo = x
    )
    

    this.objUsuario.idUsuario = tokenService.getUserId();
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
