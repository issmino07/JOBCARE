import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AdmininicioComponent } from './admininicio/admininicio.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { VerOfertasComponent } from './ver-ofertas/ver-ofertas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarOfertasComponent } from './editar-ofertas/editar-ofertas.component';
import { PlanesComponent } from './planes/planes.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AdmininicioComponent,
    AccountSettingsComponent,
    PerfilComponent,
    VerOfertasComponent,
    EditarOfertasComponent,
    PlanesComponent,
    

  ],

  exports: [

    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    NgxPaginationModule,
  ]
})



export class PagesModule { }
