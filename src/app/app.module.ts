import { PaginawebModule } from './paginaweb/paginaweb.module';
import { AuthModule } from './auth/auth.module';



//modulos
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';






@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
 
 


  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    PaginawebModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
