import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


declare function customInitFunctions();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

 public imgUrl= ''

  constructor(private _usuarioService: UsuarioService, private router: Router, ) { }

  ngOnInit(){

    this.usuario= this._usuarioService.usuario;
    customInitFunctions();
    setTimeout(() => {
    
      this._usuarioService.logOut()
       }, 900000);
  }

  cerrarSesion(){
   this._usuarioService.logOut()
  }

  
activar(){
  customInitFunctions();
}

role="EMPLEADO_ROLE"

guardarUsuario( usuario: Usuario ) {
  this.usuario.role = this.role    
  this._usuarioService.actualizarUsuario( usuario )
          .subscribe();

          this.router.navigate(['/login']);

}
role1 = "EMPLEADOR_ROLE"
guardarUsuario1( usuario: Usuario ) {
  this.usuario.role = this.role1    
  this._usuarioService.actualizarUsuario( usuario )
          .subscribe();

          this.router.navigate(['/login']);

}

}
