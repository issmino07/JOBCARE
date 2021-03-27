import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function customInitFunctions();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  usuario: Usuario;
  constructor(public _usuarioServices: UsuarioService,) { 
    this.usuario = this._usuarioServices.usuario;
  }

  ngOnInit(): void {
 
  }

}
