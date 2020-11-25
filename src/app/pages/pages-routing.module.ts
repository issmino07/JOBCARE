import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AdmininicioComponent } from './admininicio/admininicio.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    children: [
        { path: '', component: DashboardComponent, data:{ titulo: 'Dashboard'} },
        { path: 'admininico', component: AdmininicioComponent },
        { path: 'account-settings', component: AccountSettingsComponent,  data:{ titulo: 'Temas'} },
    ]
},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ],

  exports:[ RouterModule]
})
export class PagesRoutingModule { }
