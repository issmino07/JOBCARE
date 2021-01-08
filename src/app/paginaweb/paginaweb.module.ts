import { HeaderPaginaComponent } from './header-pagina/header-pagina.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';

import { FooterComponent } from './footer/footer.component';
import { Home2Component } from './home2/home2.component';
import { NineraComponent } from './ninera/ninera.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
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
import { OfertasEmpleoComponent } from './ofertas-empleo/ofertas-empleo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    HeaderPaginaComponent,

    InicioComponent,
    HomeComponent,
 
    FooterComponent,
    Home2Component,
    NineraComponent,
    CursosComponent,
    NineraEmpleadorComponent,
    CuidadoAdultoComponent,
    CuidadoAdultoEmpleadorComponent,
    DomesticoComponent,
    DomesticoEmpleadorComponent,
    MascotaComponent,
    MascotaEmpleadorComponent,
    CapacidadesEspecialesComponent,
    CapacidadesEspecialesEmpleadorComponent,
    TutoriasComponent,
    TutoriasEmpleadorComponent,
    TrabajosComponent,
    TrabajosEmpleadorComponent,
    AsistenciaComponent,
    AsistenciaEmpleadorComponent,
    MensajeriaComponent,
    MensajeriaEmpleadorComponent,
    SpaComponent,
    SpaEmpleadorComponent,
    ProfesionalComponent,
    ProfesionalEmpleadorComponent,
    OfertasEmpleoComponent,
   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXx41aKyQCxdHC7ixwG0rfOvmMAcvYJZk',
      libraries: ['places']
    })

  ],
  exports:[
    HeaderPaginaComponent,
    NineraComponent,
    HeaderPaginaComponent,
 
  ]
})
export class PaginawebModule { }
