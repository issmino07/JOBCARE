import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AdmininicioComponent } from './admininicio/admininicio.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerOfertasComponent } from './ver-ofertas/ver-ofertas.component';
import { EditarOfertasComponent } from './editar-ofertas/editar-ofertas.component';
import { PlanesComponent } from './planes/planes.component';
import { HojavidaFormularioComponent } from './hojavida-formulario/hojavida-formulario.component';
import { EditarHojavidaComponent } from './editar-hojavida/editar-hojavida.component';
import { VerHojavidaComponent } from './ver-hojavida/ver-hojavida.component';
import { PlanEmpleadosComponent } from './plan-empleados/plan-empleados.component';



const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    children: [
        { path: '', component: DashboardComponent, data:{ titulo: 'Dashboard'} },
        { path: 'admininico', component: AdmininicioComponent },
        { path: 'admininico/:id', component: AdmininicioComponent },
        { path: 'account-settings', component: AccountSettingsComponent,  data:{ titulo: 'Temas'} },
        { path: 'perfil', component: PerfilComponent,  data:{ titulo: 'Perfil'} },
        { path: 'verofertas', component: VerOfertasComponent,  data:{ titulo: 'Ver Ofertas'} },
        { path: 'editaroferta', component: EditarOfertasComponent,  data:{ titulo: 'Editar Ofertas'} },
        { path: 'editaroferta/:id', component: EditarOfertasComponent,  data:{ titulo: 'Editar Ofertas'} },
        { path: 'planes', component: PlanesComponent,  data:{ titulo: 'Planes'} },
        { path: 'planes/empleados', component: PlanEmpleadosComponent,  data:{ titulo: 'Planes'} },
        { path: 'hojavida', component: HojavidaFormularioComponent },
        { path: 'editarhojavida', component: EditarHojavidaComponent },
        { path: 'editarhojavida/:id', component: EditarHojavidaComponent },
        { path: 'verhoja', component: VerHojavidaComponent },
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
