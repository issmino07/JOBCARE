import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [

    LoginComponent,
    RegisterComponent,
  ],

  exports: [
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class AuthModule { }
