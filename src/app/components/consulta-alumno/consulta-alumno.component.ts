import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],

  selector: 'app-consulta-alumno',
  templateUrl: './consulta-alumno.component.html',
  styleUrls: ['./consulta-alumno.component.css'],
})
export class ConsultaAlumnoComponent {
  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];

  nombres: string = '';
  dni: string = '';
  fecDesde: Date = new Date('01-01-1900');
  fecHasta: Date = new Date();
  estado: boolean = true;
  pais: string = '-1';

  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    'idAlumno',
    'nombres',
    'apellidos',
    'telefono',
    'dni',
    'tipoSangre',
    'fechaNacimiento',
    'pais',
    'modalidad',
    'estado',
  ];

  constructor(
    private utilService: UtilService,
    private alumnoService: AlumnoService
  ) {
    this.utilService
      .listaModalidadAlumno()
      .subscribe((x) => (this.lstModalidad = x));
    this.utilService.listaPais().subscribe((x) => (this.lstPais = x));
  }

  consulta() {
    console.log('>>> refreshTable [ini]');
    console.log('>>> nombres >> ' + this.nombres);
    console.log('>>> dni >> ' + this.dni);
    console.log('>>> fecDesde >> ' + this.fecDesde.toISOString());
    console.log('>>> fecHasta >> ' + this.fecHasta.toISOString());
    console.log('>>> estado >> ' + this.estado);
    console.log('>>> pais >> ' + this.pais);

    this.alumnoService
      .consultarAlumnoComplejo(
        this.nombres,
        this.dni,
        this.fecDesde.toISOString(),
        this.fecHasta.toISOString(),
        this.estado ? 1 : 0,
        parseInt(this.pais)
      )
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource<Alumno>(x);
        this.dataSource.paginator = this.paginator;
      });
  }
}
