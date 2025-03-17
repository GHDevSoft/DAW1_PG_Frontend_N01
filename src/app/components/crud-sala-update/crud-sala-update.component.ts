import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { SalaService } from '../../services/sala.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { Sala } from '../../models/sala.model';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-crud-sala-update',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-sala-update.component.html',
  styleUrls: ['./crud-sala-update.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class CrudSalaUpdateComponent {

  lstTipoSala : DataCatalogo[] = [];
  lstSede : DataCatalogo[] = [];
  lstEstadoReserva : DataCatalogo[] = [];
  ObjUsuario: Usuario = {};

  formsActualiza = this.formBuilder.group({
    validaNumero: ['', [Validators.required, Validators.pattern('[A-Z]{1}[0-9]{3}')]],
    validaPiso: ['', [Validators.required, Validators.pattern('^(?!0)\\d{1,2}$')]],
    validaNumAlum: ['', [Validators.required, Validators.pattern('^(?!0)\\d{1,2}$')]],
    validaRecursos: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaTipoSala: ['', Validators.min(1)],
    validaSede: ['', Validators.min(1)],
    validaEstadoReserva: ['', Validators.min(1)],
  });

  ObjSala: Sala ={
    numero: "",
    piso: 0,
    numAlumnos: 0,
    recursos: "",
    tipoSala:{
      idDataCatalogo:-1
    },
    sede:{
      idDataCatalogo:-1
    },
    estadoReserva:{
      idDataCatalogo:-1
    }
  }



  constructor(private utilService: UtilService,
              private tokenService: TokenService,
              private salaService: SalaService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { 

    this.ObjSala = data;

    console.log(">>>> [ini] >>> objSala");
    console.log(this.ObjSala);

    this.utilService.listaTipoSala().subscribe(
          x => this.lstTipoSala = x
    );
    this.utilService.listaSede().subscribe(
          x => this.lstSede = x
    );
    this.utilService.listaEstadoReserva().subscribe(
          x => this.lstEstadoReserva = x
    );
    this.ObjUsuario.idUsuario = tokenService.getUserId()


  }

  actualizar(){
    if (this.formsActualiza.valid) {
      this.ObjSala.usuarioRegistro = this.ObjUsuario;
      this.ObjSala.usuarioActualiza = this.ObjUsuario;
      this.salaService.actualizarCrud(this.ObjSala).subscribe(
        x=>{
          Swal.fire({
            icon: 'info',
            title: 'Resultado de la actualización:',
            text: x.mensaje
          })
        },
      );
    }
  }
}