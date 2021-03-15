import { Login } from 'src/app/models/login';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare function customInitFunctions();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  usuario: Usuario;

  constructor(private _usuarioService: UsuarioService,  public _sidebar: SidebarService,) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario)
    this._sidebar.cargarMenu();
    customInitFunctions();
  }

  cerrarSesion(){
    this._usuarioService.logOut()
  }

  pageRefresh() {


    setTimeout(() => {
      window.location.reload();
    }, 1000)
   
 }

}
