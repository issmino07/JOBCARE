import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {
   
  }


  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        console.log(resp)

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/dashboard');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }
  




  attachSignin(element) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
