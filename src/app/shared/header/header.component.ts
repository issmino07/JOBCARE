import { Component, OnInit } from '@angular/core';
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

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(){

    this.usuario= this._usuarioService.usuario;
    customInitFunctions();
  }

  cerrarSesion(){
   this._usuarioService.logOut()
  }

  
activar(){
  customInitFunctions();
}

}
