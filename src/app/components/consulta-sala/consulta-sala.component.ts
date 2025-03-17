import { Component, ViewChild} from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { UtilService } from '../../services/util.service';
import { SalaService } from '../../services/sala.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { Sala } from '../../models/sala.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-sala',
  templateUrl: './consulta-sala.component.html',
  styleUrls: ['./consulta-sala.component.css']
})
export class ConsultaSalaComponent{

    lstTipoSala : DataCatalogo[] = [];
    lstSede : DataCatalogo[] = [];
    lstEstadoReserva : DataCatalogo[] = [];

    //Filtro
    numero : string = "";
    estado : boolean = true;
    tipoSala : string = "-1"
    sede: string = "-1"
    estadoReserva: string = "-1"

    //Grila
   dataSource:any;

   //Clase para la paginacion
   @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

   //Cabecera
   displayedColumns = ["idSala","numero","piso","numAlumnos","recursos","tipoSala","sede","estadoReserva","estado"];

    constructor(
    private utilService: UtilService,
    private salaService: SalaService
    ) { 

    this.utilService.listaTipoSala().subscribe(
    x => this.lstTipoSala = x
    );
    this.utilService.listaSede().subscribe(
    x => this.lstSede = x
    );
    this.utilService.listaEstadoReserva().subscribe(
    x => this.lstEstadoReserva = x
    )

  }

  consulta(){
      console.log(">>> refreshTable [ini]");
      console.log(">>> numero >> " + this.numero);
      console.log(">>> estado >> " + this.estado);
      console.log(">>> tipoSala >> " + this.tipoSala);
      console.log(">>> sede >> " + this.sede);
      console.log(">>> estadoReserva >> " + this.estadoReserva);

      this.salaService.consultarSalaComplejo(
                      this.numero,
                      this.estado ? 1 : 0,
                      parseInt(this.tipoSala),
                      parseInt(this.sede),
                      parseInt(this.estadoReserva)
                      ).subscribe(
        x => {
                  this.dataSource = new MatTableDataSource<Sala>(x);
                  this.dataSource.paginator = this.paginator
        }
);

  }
  
}
