import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { UtilService } from '../../services/util.service';
import { LibroService } from '../../services/libro.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { Libro } from '../../models/libro.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-libro',
  templateUrl: './consulta-libro.component.html',
  styleUrls: ['./consulta-libro.component.css']
})

export class ConsultaLibroComponent {

  lstCategoriaLibro: DataCatalogo[] = [];
  lstTipoLibro: DataCatalogo[] = [];
  
  //Filtro
  titulo : string = "";
  estado : boolean = true;
  tipo : string = "-1"
  categoria: string = "-1"

  //Grila
  dataSource: any;
  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //Cabecera
  displayedColumns = ["idLibro", "titulo", "anio", "serie", "tipo", "categoria", "prestamo", "estado"];
  //filtro de la consulta

  constructor(private utilService: UtilService,
    private libroService: LibroService) {

    this.utilService.listaTipoLibroRevista().subscribe(
      x => this.lstTipoLibro = x
    );
    this.utilService.listaCategoriaDeLibro().subscribe(
      x => this.lstCategoriaLibro = x
    );

  }

  consulta() {
    console.log(">>> refreshTable [ini]");
    console.log(">>> titulo >> " + this.titulo);
    console.log(">>> estado >> " + this.estado);
    console.log(">>> tipo >> " + this.tipo);
    console.log(">>> categoria >> " + this.categoria);
    this.libroService.consultarLibroComplejo(
                                              this.titulo,
                                            this.estado ? 1 : 0,
                                            parseInt(this.tipo),
                                            parseInt(this.categoria)
                                            ).subscribe(
                                              x=>{
                                                this.dataSource = new MatTableDataSource<Libro>(x);
                                                this.dataSource.paginator = this.paginator
                                              }
                                            );
  }

}