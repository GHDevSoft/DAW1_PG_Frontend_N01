import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { Alumno } from '../../models/alumno.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { AlumnoService } from '../../services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-alumno',
  standalone: true,
  imports: [
    AppMaterialModule,
    FormsModule,
    CommonModule,
    MenuComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css'],
})
export class AgregarAlumnoComponent {
  formsRegistra = this.formBuilder.group({
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
  objUsuario: Usuario = {};

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

  constructor(
    private utilService: UtilService,
    private tokenService: TokenService,
    private alumnoService: AlumnoService,
    private formBuilder: FormBuilder
  ) {
    this.utilService.listaPais().subscribe((x) => (this.lstPais = x));
    this.utilService
      .listaModalidadAlumno()
      .subscribe((x) => (this.lstModalidad = x));
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra() {
    if (this.formsRegistra.valid) {
      this.objAlumno.usuarioRegistro = this.objUsuario;
      this.objAlumno.usuarioActualiza = this.objUsuario;

      this.alumnoService.registrar(this.objAlumno).subscribe((x) => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
      });

      this.formsRegistra.reset();

      Object.keys(this.formsRegistra.controls).forEach((x) => {
        this.formsRegistra.get(x)?.setErrors(null);
      });
    }
  }
}
