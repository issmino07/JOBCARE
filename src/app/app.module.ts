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
    
   
  

  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
