import { CategoriasService } from './services/categorias.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { SidebarService } from './services/sidebar.service';
import { PagesModule } from './pages/pages.module';
import { PaginawebModule } from './paginaweb/paginaweb.module';
import { AuthModule } from './auth/auth.module';



//modulos

import { AppRoutingModule } from './app-routing.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { UsuarioService } from './services/usuario.service';
import { PipesModule } from './pipes/pipes.module';
import { SubirArchivoService } from './services/subir-archivo.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
 
  


  ],

  imports: [
    PaginawebModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    PipesModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
 
  ],
  providers: [
    UsuarioService,
    SidebarService,
    SubirArchivoService, 
    OfertaService,
    CategoriasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
