import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Libro } from '../../models/libro.model';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { LibroService } from '../../services/libro.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({

  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-libro-update',
  templateUrl: './crud-libro-update.component.html',
  styleUrls: ['./crud-libro-update.component.css']
})
export class CrudLibroUpdateComponent {
  lstCategoriaLibro: DataCatalogo[] = [];
  lstTipoLibro: DataCatalogo[] = [];
  lstEstadoPrestamo: DataCatalogo[] = [];
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
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.objLibro = data;

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


  actualizar() {
    this.objLibro.usuarioActualiza = this.objUsuario;
    this.objLibro.usuarioRegistro = this.objUsuario;

    this.libroservice.actualizarCrud(this.objLibro).subscribe(
      x => {
        Swal.fire({
          icon: "info",
          title: 'Resultado del registro Giraldo carlos  ',
          text: x.mensaje,
        })
      },
    );
  }
}