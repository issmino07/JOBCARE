import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

import { Home2Component } from './home2/home2.component';
import { NineraComponent } from './ninera/ninera.component';
import { CursosComponent } from './cursos/cursos.component';
import { NineraEmpleadorComponent } from './ninera-empleador/ninera-empleador.component';
import { CuidadoAdultoComponent } from './cuidado-adulto/cuidado-adulto.component';
import { CuidadoAdultoEmpleadorComponent } from './cuidado-adulto-empleador/cuidado-adulto-empleador.component';
import { DomesticoComponent } from './domestico/domestico.component';
import { DomesticoEmpleadorComponent } from './domestico-empleador/domestico-empleador.component';
import { MascotaComponent } from './mascota/mascota.component';
import { MascotaEmpleadorComponent } from './mascota-empleador/mascota-empleador.component';
import { CapacidadesEspecialesComponent } from './capacidades-especiales/capacidades-especiales.component';
import { CapacidadesEspecialesEmpleadorComponent } from './capacidades-especiales-empleador/capacidades-especiales-empleador.component';
import { TutoriasComponent } from './tutorias/tutorias.component';
import { TutoriasEmpleadorComponent } from './tutorias-empleador/tutorias-empleador.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { TrabajosEmpleadorComponent } from './trabajos-empleador/trabajos-empleador.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AsistenciaEmpleadorComponent } from './asistencia-empleador/asistencia-empleador.component';
import { MensajeriaComponent } from './mensajeria/mensajeria.component';
import { MensajeriaEmpleadorComponent } from './mensajeria-empleador/mensajeria-empleador.component';
import { SpaComponent } from './spa/spa.component';
import { SpaEmpleadorComponent } from './spa-empleador/spa-empleador.component';
import { ProfesionalComponent } from './profesional/profesional.component';
import { ProfesionalEmpleadorComponent } from './profesional-empleador/profesional-empleador.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home2', component: Home2Component},
  { path: 'ninera', component: NineraComponent},
  { path: 'nineraEmpleador', component: NineraEmpleadorComponent},
  { path: 'cuidadoAdulto', component: CuidadoAdultoComponent},
  { path: 'cuidadoAdultoEmpleador', component: CuidadoAdultoEmpleadorComponent},
  { path: 'domestico', component: DomesticoComponent},
  { path: 'domesticoEmpleador', component: DomesticoEmpleadorComponent},
  { path: 'mascota', component: MascotaComponent},
  { path: 'mascotaEmpleador', component: MascotaEmpleadorComponent},
  { path: 'capacidades', component: CapacidadesEspecialesComponent},
  { path: 'capacidadesEmpleador', component: CapacidadesEspecialesEmpleadorComponent},
  { path: 'tutorias', component: TutoriasComponent},
  { path: 'tutoriasEmpleador', component: TutoriasEmpleadorComponent},
  { path: 'trabajos', component: TrabajosComponent},
  { path: 'trabajosEmpleador', component: TrabajosEmpleadorComponent},
  { path: 'asistencia', component: AsistenciaComponent},
  { path: 'asistenciaEmpleador', component: AsistenciaEmpleadorComponent},
  { path: 'mensajeria', component: MensajeriaComponent},
  { path: 'mensajeriaEmpleador', component: MensajeriaEmpleadorComponent},
  { path: 'spa', component: SpaComponent},
  { path: 'spaEmpleador', component: SpaEmpleadorComponent},
  { path: 'profesional', component: ProfesionalComponent},
  { path: 'profesionalEmpleador', component: ProfesionalEmpleadorComponent},
  { path: 'cursos', component: CursosComponent},



 

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ],

  exports:[ RouterModule]
})
export class PaginawebRoutingModule { }
