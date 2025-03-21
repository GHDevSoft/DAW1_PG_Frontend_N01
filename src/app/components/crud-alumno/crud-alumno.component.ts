import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoService } from '../../services/alumno.service';
import { CrudAlumnoAddComponent } from '../crud-alumno-add/crud-alumno-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../models/alumno.model';
import { CrudAlumnoUpdateComponent } from '../crud-alumno-update/crud-alumno-update.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-alumno',
  templateUrl: './crud-alumno.component.html',
  styleUrls: ['./crud-alumno.component.css'],
})
export class CrudAlumnoComponent {
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
    'acciones',
  ];

  filtro: string = '';

  constructor(
    private dialogService: MatDialog,
    private alumnoService: AlumnoService
  ) {}

  openAddDialog() {
    console.log('>>> openAddDialog [ini]');
    const dialogo = this.dialogService.open(CrudAlumnoAddComponent);
    dialogo.afterClosed().subscribe((x) => {
      console.log('>>> x >> ' + x);
      if (x == 1) {
        this.refreshTable();
      }
    });
    console.log('>>> openAddDialog [fin]');
  }

  refreshTable() {
    console.log('>>> refreshTable [ini]');
    var msgFiltro = this.filtro == '' ? 'todos' : this.filtro;
    this.alumnoService.consultarCrud(msgFiltro).subscribe((x) => {
      this.dataSource = new MatTableDataSource<Alumno>(x);
      this.dataSource.paginator = this.paginator;
    });

    console.log('>>> refreshTable [fin]');
  }

  openUpdateDialog(obj: Alumno) {
    console.log('>>> openUpdateDialog [ini]');
    const dialogo = this.dialogService.open(CrudAlumnoUpdateComponent, {
      data: obj,
    });
    dialogo.afterClosed().subscribe((x) => {
      console.log('>>> x >> ' + x);
      if (x === 1) {
        this.refreshTable();
      }
    });
    console.log('>>> openUpdateDialog [fin]');
  }

  actualizaEstado(obj: Alumno) {
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.alumnoService.actualizarCrud(obj).subscribe();
  }

  elimina(obj: Alumno) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Los cambios no se van a revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.eliminarCrud(obj.idAlumno || 0).subscribe((x) => {
          this.refreshTable();
          Swal.fire('Mensaje', x.mensaje, 'info');
        });
      }
    });
  }
}
