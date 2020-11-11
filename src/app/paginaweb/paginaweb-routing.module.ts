import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { Cajas1Component } from './cajas1/cajas1.component';
import { Cajas2Component } from './cajas2/cajas2.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'home', component: HomeComponent},
  { path: 'categoria1', component: Cajas1Component},
  { path: 'categoria2', component: Cajas2Component},
 

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
