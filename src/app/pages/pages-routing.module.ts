import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerOfertasComponent } from './empleadores/ver-ofertas/ver-ofertas.component';
import { EditarOfertasComponent } from './empleadores/editar-ofertas/editar-ofertas.component';

import { HojavidaFormularioComponent } from './empleados/hojavida-formulario/hojavida-formulario.component';
import { EditarHojavidaComponent } from './empleados/editar-hojavida/editar-hojavida.component';
import { VerHojavidaComponent } from './empleados/ver-hojavida/ver-hojavida.component';
import { PlanEmpleadosComponent } from './empleados/plan-empleados/plan-empleados.component';
import { AdministradorComponent } from './administracion/administrador/administrador.component';
import { CrearCursosComponent } from './administracion/crear-cursos/crear-cursos.component';
import { VerCursosComponent } from './administracion/ver-cursos/ver-cursos.component';
import { PerfilEmpleadosComponent } from '../paginaweb/perfil-empleados/perfil-empleados.component';
import { AdmininicioComponent } from './empleadores/admininicio/admininicio.component';
import { PlanesComponent } from './empleadores/planes/planes.component';
import { PerfilesComponent } from './empleadores/perfiles/perfiles.component';
import { OfertasPublicadasComponent } from './empleados/ofertas-publicadas/ofertas-publicadas.component';
import { PerfilesAdminComponent } from './administracion/perfiles-admin/perfiles-admin.component';
import { OfertasAdminComponent } from './administracion/ofertas-admin/ofertas-admin.component';
import { EditarCursosComponent } from './administracion/editar-cursos/editar-cursos.component';
import { CursosEmpleadosComponent } from './empleados/cursos-empleados/cursos-empleados.component';
import { CursosEmpleadoresComponent } from './empleadores/cursos-empleadores/cursos-empleadores.component';



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
        { path: 'administrador', component: AdministradorComponent },
        { path: 'crearCurso', component: CrearCursosComponent },
        { path: 'verCurso', component: VerCursosComponent },
        { path: 'perfiles', component: PerfilesComponent},
        { path: 'ofertasPublicadas', component: OfertasPublicadasComponent},
        { path: 'perfilesAdmin', component: PerfilesAdminComponent},
        { path: 'ofertasAdmin', component: OfertasAdminComponent},
        { path: 'editarCursos', component: EditarCursosComponent},
        { path: 'editarCursos/:id', component: EditarCursosComponent},
        { path: 'cursosEmpleados', component: CursosEmpleadosComponent},
        { path: 'cursosEmpleadores', component: CursosEmpleadoresComponent},
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
