import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { TokenService } from '../../security/token.service';
import { Title } from '@angular/platform-browser';
import { Alumno } from '../../models/alumno.model';
import { Libro } from '../../models/libro.model';
import { PrestamoService } from '../../services/prestamo.service';
import { ModelAlumnoComponent } from '../model-alumno/model-alumno.component';
import { ModelLibroComponent } from '../model-libro/model-libro.component';
import { PrestamoHasLibro } from '../../models/prestamoHasLibro.model';
import { PrestamoHasLibroPK } from '../../models/prestamoHasLibroPK.model';
import { Prestamo } from '../../models/prestamo.model';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';


@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-transaccion-prestamo-libro',
  templateUrl: './transaccion-prestamo-libro.component.html',
  styleUrls: ['./transaccion-prestamo-libro.component.css']
})
export class TransaccionPrestamoLibroComponent {

  objAlumno : Alumno = {};
  objLibro  : Libro = {};
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idLibro","titulo","anio","serie","fechaDevol",'actions'];

  lstLibros : Libro [] = [];
  objUsuario: Usuario = {} ;

  constructor(private dialogService: MatDialog, 
              private prestamoService: PrestamoService,
              private tokenService: TokenService) {
              this.objUsuario.idUsuario = tokenService.getUserId();
  }

  
  ngOnInit(): void {}

  buscaAlumno(){
      console.log(">>> buscaAlumno ");
      const dialog  = this.dialogService.open(ModelAlumnoComponent);
      dialog.afterClosed().subscribe( () => this.cargaAlumno());
  }

  cargaAlumno(){
      var str = window.sessionStorage.getItem("ALUMNO") || '{}';
      this.objAlumno = JSON.parse(str);
  }

  buscaLibro(){
    console.log(">>> buscaLibro ");
    const dialog  = this.dialogService.open(ModelLibroComponent);
    dialog.afterClosed().subscribe( () => this.cargaLibro());
  }

  cargaLibro(){
      var str = window.sessionStorage.getItem("LIBRO") || '{}';
      this.objLibro = JSON.parse(str);
  }

  agregarLibro(){
      if (!this.objLibro.idLibro) {
         Swal.fire({title: "Validación", text: "Por favor, complete todos los campos", icon: "info"});
         return;
      }
      /*if (this.objLibro.anio <= 0) {
         Swal.fire({ title: "Validación", text: "La cantidad debe ser mayor a cero", icon: "info" });
         return;
      }*/
      if (this.lstLibros.some(x => x.idLibro === this.objLibro.idLibro)) {
        Swal.fire({ title: "Validación", text: "El producto ya está en la lista", icon: "info" });
        return;
      }
      this.lstLibros.push(this.objLibro);
      this.dataSource = new MatTableDataSource(this.lstLibros);
      this.dataSource.paginator = this.paginator 
  }

  eliminaLibro(objLibro: Libro){
    const index = this.lstLibros.findIndex(x => x.idLibro === objLibro.idLibro);
    if (index !== -1) {
      this.lstLibros.splice(index, 1); 
      this.dataSource = new MatTableDataSource(this.lstLibros);
      this.dataSource.paginator = this.paginator;
    }
  }

  registrarPrestamo(){
     let lstDetalles : PrestamoHasLibro [] = [];
     
     this.lstLibros.forEach( (item) => {
         var pk : PrestamoHasLibroPK = {
                idLibro : item.idLibro
         }

         var objDetalle : PrestamoHasLibro = {
              fechaDevol: item.fechaDevolucion,
              serie : item.serie,
              anio : item.anio,
              libro : item,
              prestamoHasLibroPK : pk
         }

         lstDetalles.push(objDetalle);
     });

     let objPrestamo : Prestamo = {
        alumno : this.objAlumno,
        usuario : this.objUsuario,
        detallesPrestamo : lstDetalles
     };

     this.prestamoService.inserta(objPrestamo).subscribe(x => {
          Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
          this.objAlumno = {};
          this.objLibro = {};
          this.lstLibros = [];
          this.dataSource = new MatTableDataSource(this.lstLibros);
          this.dataSource.paginator = this.paginator;
     });

  }
  
}