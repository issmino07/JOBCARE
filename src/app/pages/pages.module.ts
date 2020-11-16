import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AdmininicioComponent } from './admininicio/admininicio.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AdmininicioComponent,
    AccountSettingsComponent,
    

  ],

  exports: [

    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})



export class PagesModule { }
