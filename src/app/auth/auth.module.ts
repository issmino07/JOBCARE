import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { RequestResetComponent } from './recuperarContrase├▒a/request-reset/request-reset.component';
import { ResponseResetComponent } from './recuperarContrase├▒a/response-reset/response-reset.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginHeaderComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],

  exports: [
    LoginComponent,
    RegisterComponent,

  ],

  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
