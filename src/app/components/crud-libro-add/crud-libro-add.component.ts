import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Libro } from '../../models/libro.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { LibroService } from '../../services/libro.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-crud-libro-add',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-libro-add.component.html',
  styleUrls: ['./crud-libro-add.component.css']
})
export class CrudLibroAddComponent {
  lstCategoriaLibro: DataCatalogo[] = [];
  lstTipoLibro: DataCatalogo[] = [];
  lstEstadoPrestamo: DataCatalogo[] = [];
  //declaracion de las validaciones
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
    this.objLibro.usuarioActualiza = this.objUsuario;
    this.objLibro.usuarioRegistro = this.objUsuario;
    
    this.libroservice.registrarCrud(this.objLibro).subscribe(
      x => {
        Swal.fire({
          icon: "info",
          title: 'Resultado del registro Giraldo carlos ',
          text: x.mensaje,
        })
      },
    );
  } 
}