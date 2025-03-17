import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent  {

  lstPais: Pais[] = [];
  lstTipo: DataCatalogo[] = [];
  
  razonsocial : string = "";
  ruc : string = "";
  contacto : string = "";
  celular : string = "";
  estado : boolean = true;
  tipo : string = "-1"
  pais: string = "-1"

  dataSource:any;
  
  


  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idProveedor","razonsocial","ruc","direccion","telefono","celular","contacto", "estado","pais","tipo"];

  constructor(private utilService: UtilService,private tokenService: TokenService,private proveedorService: ProveedorService,) {
    this.utilService.listaTipoProveedor().subscribe(
      x => this.lstTipo = x
    );
    this.utilService.listaPais().subscribe(
      x => this.lstPais = x
    )
   }

   consulta(){
    console.log(">>> refreshTable [ini]");
    console.log(">>> razonsocial >> " + this.razonsocial);
    console.log(">>> ruc >> " + this.ruc);
    console.log(">>> celular >> " + this.celular);
    console.log(">>> contacto >> " + this.contacto);
    console.log(">>> estado >> " + this.estado);
    console.log(">>> tipo >> " + this.tipo);
    console.log(">>> pais >> " + this.pais);
    
    this.proveedorService.consultarProveedorComplejo(
                this.razonsocial,
                this.ruc,
                this.estado ? 1 : 0,
                this.celular,
                this.contacto,
                parseInt(this.pais),
                parseInt(this.tipo)
              ).subscribe(
          x => {
            this.dataSource = new MatTableDataSource<Proveedor>(x);
            this.dataSource.paginator = this.paginator
          }
    );
  

    console.log(">>> refreshTable [fin]");
  }

}
