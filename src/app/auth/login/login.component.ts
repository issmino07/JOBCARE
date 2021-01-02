import { Component,  OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string = '';
  constructor( private router: Router,
 
  ) { }

  ngOnInit() {
  
    this.email = localStorage.getItem('email') || '';
  }


  ingresar( form: NgForm ) {
    if ( !form.valid ) {
   

      return;
    }

//    let usuario = new Usuario(
  //    null,
  //    form.value.email,
   //   form.value.password
//    );

   /* this._usuarioService.login( usuario, form.value.recuerdame ).subscribe(res => {
    
      this.router.navigate(['/Inicio']);
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
  */



}
}