import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import { Libro } from '../../models/libro.model';
import { Autor } from '../../models/autor.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { AutorService } from '../../services/autor.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-transaccion-asignacion-libro',
  templateUrl: './transaccion-asignacion-libro.component.html',
  styleUrls: ['./transaccion-asignacion-libro.component.css'],
})
export class TransaccionAsignacionLibroComponent {
  lstLibro: Libro[] = [];
  lstAutor: Autor[] = [];
  lstAutorDeLibro: Autor[] = [];

  libro: string = '-1';
  autor: string = '-1';

  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['idAutor', 'nombres', 'actions'];

  constructor(
    private utilService: UtilService,
    private autorService: AutorService
  ) {
    this.utilService.listaAutor().subscribe((x) => (this.lstAutor = x));
    this.utilService.listaLibro().subscribe((x) => (this.lstLibro = x));
  }

  cargaAutor() {
    this.autorService.listaAutorDeLibro(this.libro).subscribe((x) => {
      this.lstAutorDeLibro = x;
      this.dataSource = new MatTableDataSource(this.lstAutorDeLibro);

      this.dataSource.paginator = this.paginator;
    });
  }

  registraAutor() {
    console.log('>> registraAutor >>> ');
    console.log('>> this.libro >>> ' + this.libro);
    console.log('>> this.autor >>> ' + this.autor);

    this.autorService.registraAutor(this.libro, this.autor).subscribe((x) => {
      Swal.fire({ title: 'Mensaje', text: x.mensaje, icon: 'info' });
      this.lstAutorDeLibro = x.lista;
      this.dataSource = new MatTableDataSource(this.lstAutorDeLibro);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminaAutor(obj: Autor) {
    console.log('>> eliminaAutor >>> ');
    console.log('>> this.libro >>> ' + this.libro);
    console.log('>> this.autor >>> ' + this.autor);

    this.autorService.eliminaAutor(this.libro, obj.idAutor!).subscribe((x) => {
      Swal.fire({ title: 'Mensaje', text: x.mensaje, icon: 'info' });
      this.lstAutorDeLibro = x.lista;
      this.dataSource = new MatTableDataSource(this.lstAutorDeLibro);
      this.dataSource.paginator = this.paginator;
    });
  }
}
