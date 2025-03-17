import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { Rol } from '../../models/rol.models';
import { Usuario } from '../../models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { RolService } from '../../services/rol.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-transaccion-asignacion-rol',
  templateUrl: './transaccion-asignacion-rol.component.html',
  styleUrls: ['./transaccion-asignacion-rol.component.css']
})
export class TransaccionAsignacionRolComponent {
  lstUsuario: Usuario[] = [];
  lstRol: Rol[] = [];
  lstRolDeUsuario: Rol[] = [];

  usuario : Usuario = new Usuario() ;
  rol : string = "-1";


  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idRol","usuario","nombre",'actions'];

  constructor(private utilService: UtilService, private rolService: RolService){
        this.utilService.listaUsuario().subscribe(
            x   =>   this.lstUsuario =x
        );
        this.utilService.listaRol().subscribe(
            x   =>   this.lstRol=x
        );
  }


  cargaRol(){
    this.rolService.listaRolDeUsuario(this.usuario.idUsuario?this.usuario.idUsuario.toString():"").subscribe(
          x   => {
                this.lstRolDeUsuario =x
                this.dataSource = new MatTableDataSource(this.lstRolDeUsuario);
                this.dataSource.paginator = this.paginator 
          } 
    );
  }


  registraRol(){
      console.log(">> registraPasatiempo >>> ");
      console.log(">> this.usuario >>> " + this.usuario );
      console.log(">> this.pasatiempo >>> " + this.rol );
      this.rolService.registraRol(this.usuario.idUsuario?this.usuario.idUsuario.toString():"", this.rol).subscribe(
          x => {
            Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
            this.lstRolDeUsuario = x.lista
            this.dataSource = new MatTableDataSource(this.lstRolDeUsuario);
            this.dataSource.paginator = this.paginator 

          }
      );
  }

  eliminaRol(obj:Rol){
      console.log(">> eliminaPasatiempo >>> ");
      console.log(">> this.usuario >>> " + this.usuario );
      console.log(">> this.pasatiempo >>> " + this.rol );
      this.rolService.eliminaRol(this.usuario.idUsuario?this.usuario.idUsuario.toString():"", obj.idRol!).subscribe(
            x => {
              Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
              this.lstRolDeUsuario = x.lista
              this.dataSource = new MatTableDataSource(this.lstRolDeUsuario);
              this.dataSource.paginator = this.paginator 

            }
      );
  }

  
}