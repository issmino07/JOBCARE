import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginHeaderComponent } from './login-header/login-header.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginHeaderComponent,
  
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
