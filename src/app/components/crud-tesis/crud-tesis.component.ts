import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { MatDialog } from '@angular/material/dialog';
import { CrudTesisAddComponent } from '../crud-tesis-add/crud-tesis-add.component';
import { TesisService } from '../../services/tesis.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tesis } from '../../models/tesis.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudTesisUpdateComponent } from '../crud-tesis-update/crud-tesis-update.component';
import Swal from 'sweetalert2';

@Component({
      standalone: true,
      imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
      selector: 'app-crud-tesis',
      templateUrl: './crud-tesis.component.html',
      styleUrls: ['./crud-tesis.component.css']
})
export class CrudTesisComponent {

      dataSource: any;

      @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

      displayedColumns = ["idTesis", "titulo", "fechaCreacion", "tema", "idioma", "centroEstudios", "estado", "acciones"];

      filtro: string = "";

      constructor(private dialogService: MatDialog, private tesisService: TesisService) {

      }

      openAddDialog() {
            console.log(">>> openAddDialog [ini]");
            const dialogo = this.dialogService.open(CrudTesisAddComponent);
            dialogo.afterClosed().subscribe(
                  x => {
                        console.log(">>> x >> " + x);
                        if (x === 1) {
                              this.refreshTable();
                        }
                  }
            );
            console.log(">>> openAddDialog [fin]");
      }

      openUpdateDialog(obj: Tesis) {
            console.log(">>> openUpdateDialog [ini]");
            const dialogo = this.dialogService.open(CrudTesisUpdateComponent, { data: obj });
            dialogo.afterClosed().subscribe(
                  x => {
                        console.log(">>> x >> " + x);
                        if (x === 1) {
                              this.refreshTable();
                        }
                  }
            );
            console.log(">>> openUpdateDialog [fin]");
      }

      refreshTable() {
            console.log(">>> refreshTable [ini]");
            var msgFiltro = this.filtro == "" ? "todos" : this.filtro;
            this.tesisService.consultarCrud(msgFiltro).subscribe(
                  x => {
                        this.dataSource = new MatTableDataSource<Tesis>(x);
                        this.dataSource.paginator = this.paginator
                  }
            );

            console.log(">>> refreshTable [fin]");
      }

      actualizaEstado(obj: Tesis) {
            obj.estado = obj.estado == 1 ? 0 : 1;
            this.tesisService.actualizarCrud(obj).subscribe();
      }

      elimina(obj: Tesis) {
            Swal.fire({
                  title: '¿Desea eliminar?',
                  text: "Los cambios no se van a revertir",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Sí, elimina',
                  cancelButtonText: 'No, cancelar'
            }).then((result) => {
                  if (result.isConfirmed) {
                        this.tesisService.eliminarCrud(obj.idTesis || 0).subscribe(
                              x => {
                                    this.refreshTable();
                                    Swal.fire('Mensaje', x.mensaje, 'info');
                              }
                        );
                  }
            })
      }

}


