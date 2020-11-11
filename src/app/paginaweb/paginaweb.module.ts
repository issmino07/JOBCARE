import { HeaderPaginaComponent } from './header-pagina/header-pagina.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { Cajas1Component } from './cajas1/cajas1.component';
import { Cajas2Component } from './cajas2/cajas2.component';



@NgModule({
  declarations: [
    HeaderPaginaComponent,

    InicioComponent,
    HomeComponent,
    Cajas1Component,
    Cajas2Component
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    HeaderPaginaComponent,
  ]
})
export class PaginawebModule { }
