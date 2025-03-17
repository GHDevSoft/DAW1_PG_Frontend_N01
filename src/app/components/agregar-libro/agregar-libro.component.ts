import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Libro } from '../../models/libro.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { LibroService } from '../../services/libro.service';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent {

  lstCategoriaLibro: DataCatalogo[] = [];
  lstTipoLibro: DataCatalogo[] = [];
  lstEstadoPrestamo: DataCatalogo[] = [];

    //decla validaciones


    formsRegistra = this.formBuilder.group({ 
      validatitulo: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]] , 
      validaAnio: ['', [Validators.required]] , 
      validaSerie: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')] ] , 
      validaTipoLibro: ['', Validators.min(1)] ,  
      validaCategoriaLibro: ['', Validators.min(1)] , 
      validaEstadoPrestamo: ['', Validators.min(1)] , 
  });
  objLibro: Libro = {
    titulo: "",
    anio: 0,
    serie: "",
    categoriaLibro: {
      idDataCatalogo: -1
    },
    tipoLibro: {
      idDataCatalogo: -1
    },
    estadoPrestamo: {
      idDataCatalogo: -1
    }
  }
  objUsuario: Usuario = {};

  constructor(private utilService: UtilService,
              private tokenService: TokenService,
              private libroservice: LibroService,
              private formBuilder : FormBuilder) {
    
    this.utilService.listaCategoriaDeLibro().subscribe(
      x => this.lstCategoriaLibro = x
    );
    this.utilService.listaTipoLibroRevista().subscribe(
      x => this.lstTipoLibro = x
    );
    this.utilService.listaEstadoPrestamo().subscribe(
      x => this.lstEstadoPrestamo = x
    );
    
    this.objUsuario.idUsuario = tokenService.getUserId();
  }
  
registro() {  
    if(this.formsRegistra.valid){
    this.objLibro.usuarioActualiza = this.objUsuario;
    this.objLibro.usuarioRegistro = this.objUsuario;
    
    this.libroservice.registro(this.objLibro).subscribe(
      x => {
        Swal.fire({
          icon: "info",
          title: 'Resultado del registro giraldo   ',
          text: x.mensaje,
        })
      },
    );
  } 
}
}