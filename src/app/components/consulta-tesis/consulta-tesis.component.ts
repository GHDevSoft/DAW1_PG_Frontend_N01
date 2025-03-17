import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { TesisService } from '../../services/tesis.service';
import { TokenService } from '../../security/token.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tesis } from '../../models/tesis.model';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-tesis',
  templateUrl: './consulta-tesis.component.html',
  styleUrls: ['./consulta-tesis.component.css']
})
export class ConsultaTesisComponent {

  lstTema: DataCatalogo[] = [];
  lstIdioma: DataCatalogo[] = [];
  lstCentroEstudios: DataCatalogo[] = [];


  titulo: string = "";  
  fecDesde: Date = new Date('01-01-1925');
  fecHasta: Date = new Date();
  estado: boolean = true;
  tema: string = "-1"
  idioma: string = "-1"
  centroEstudios: string = "-1"


  dataSource: any;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  displayedColumns = ["idTesis", "titulo", "fechaCreacion", "tema", "idioma", "centroEstudios", "estado"];


  constructor(private utilService: UtilService,
    private tokenService: TokenService,
    private tesisService: TesisService) {

    this.utilService.listaTemaTesis().subscribe(
      x => this.lstTema = x
    );

    this.utilService.listaIdioma().subscribe(
      x => this.lstIdioma = x
    );

    this.utilService.listaCentroEstudio().subscribe(
      x => this.lstCentroEstudios = x
    );
  }

  consulta() {
    console.log(">>> refreshTable [ini]");
    console.log(">>> titulo >> " + this.titulo);
    console.log(">>> fecDesde >> " + this.fecDesde.toISOString());
    console.log(">>> fecHasta >> " + this.fecHasta.toISOString());
    console.log(">>> estado >> " + this.estado);
    console.log(">>> tema >> " + this.tema);
    console.log(">>> idioma >> " + this.idioma);
    console.log(">>> centroEstudios >> " + this.centroEstudios);

    this.tesisService.consultarTesisComplejo(
      this.titulo,
      this.fecDesde.toISOString(),
      this.fecHasta.toISOString(),
      this.estado ? 1 : 0,
      parseInt(this.tema),
      parseInt(this.idioma),
      parseInt(this.centroEstudios)
    ).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Tesis>(x);
        this.dataSource.paginator = this.paginator
      }
    );

    console.log(">>> refreshTable [fin]");
  }

}



