import { UsuarioService } from 'src/app/services/usuario.service';
import { Component,  OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  recuerdame: boolean = false;
  usuario: string = '';
  constructor( private router: Router, private _usuarioService : UsuarioService,
 
  ) { }

  ngOnInit() {
  
    this.usuario= localStorage.getItem('email') || '';
  }


  ingresar( form: NgForm ) {
    if ( !form.valid ) {
      
      Swal.fire('warning', 'Hay errores en los campos!', 'error');
      return;
    }

    let usuario = new Login(
    
      form.value.usuario,
      form.value.password,
    
     

    );

    this._usuarioService.login( usuario, form.value.recuerdame ).subscribe(res => {
    
      this.router.navigate(['/dashboard']);
      Swal.fire('Login', `Hola  has iniciado sesión con éxito!`, 'success');
    },
    err => {
      if (err.status = (409)) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
      console.log(err)
    },
    );
  }

}