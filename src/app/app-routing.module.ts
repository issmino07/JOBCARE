import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  { path: '', component: PagesComponent,
   children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
   ]
  },

  //Rutas de inicio

  { path: 'inicio', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
 
 
 
  { path: '**', component: NopagefoundComponent}


];

@NgModule({
  declarations: [],
  imports: [
 RouterModule.forRoot( routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
