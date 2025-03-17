import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Alumno } from '../../models/alumno.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { AlumnoService } from '../../services/alumno.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [
    AppMaterialModule,
    FormsModule,
    CommonModule,
    MenuComponent,
    ReactiveFormsModule,
  ],
  selector: 'app-crud-alumno-update',
  templateUrl: './crud-alumno-update.component.html',
  styleUrls: ['./crud-alumno-update.component.css'],
})
export class CrudAlumnoUpdateComponent {
  formsActualiza = this.formBuilder.group({
    validaNombres: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,50}')],
    ],
    validaApellidos: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{5,50}')],
    ],
    validaDni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    validaCorreo: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ],
    ],
    validaTipoSangre: [
      '',
      [Validators.required, Validators.pattern('^(A|B|AB|O)[+-]?$')],
    ],
    validaFechaNacimiento: ['', [Validators.required]],
    validaTelefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    validaCelular: [
      '',
      [Validators.required, Validators.pattern('[9][0-9]{8}')],
    ],
    validaPais: ['', Validators.min(1)],
    validaModalidad: ['', Validators.min(1)],
  });

  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];
  fecha = new FormControl(new Date());

  objAlumno: Alumno = {
    nombres: '',
    apellidos: '',
    telefono: '',
    celular: '',
    dni: '',
    correo: '',
    tipoSangre: '',
    fechaNacimiento: new Date(),
    pais: {
      idPais: -1,
    },
    modalidad: {
      idDataCatalogo: -1,
    },
  };
  objUsuario: Usuario = {};

  constructor(
    private utilService: UtilService,
    private tokenService: TokenService,
    private alumnoService: AlumnoService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.objAlumno = data;

    this.utilService
      .listaModalidadAlumno()
      .subscribe((x) => (this.lstModalidad = x));
    this.utilService.listaPais().subscribe((x) => (this.lstPais = x));
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  actualizar() {
    if (this.formsActualiza.valid) {
      this.objAlumno.usuarioActualiza = this.objUsuario;
      this.objAlumno.usuarioRegistro = this.objUsuario;
      this.alumnoService.actualizarCrud(this.objAlumno).subscribe((x) => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
      });
    }
  }
}
