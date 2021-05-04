import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario :Usuario;
  imagenSubir: File;
  imagenTemporal: any;
  
    constructor(public _usuarioServices: UsuarioService,  private router: Router, ) {
     this.usuario = this._usuarioServices.usuario;
     }
  
    ngOnInit() {
    }
    
  
    guardar(usuario:Usuario){
  
      this.usuario.usuario = usuario.usuario;
      this.usuario.email = usuario.email;
      
      //funcion de actulizar 
      this._usuarioServices.actualizarUsuario(usuario)
      .subscribe( resp =>{
        console.log(resp);
  
        Swal.fire('Usuario', `Actualizado con exito`, 'success');
      })
   }
  
   seleccionaImagen( archivo: File){
     
    if(!archivo){
      this.imagenSubir = null;
     return;
    }
  
    this.imagenSubir = archivo;
   console.log(event);
  
   let reader = new FileReader();
   let urlImagenTemp = reader.readAsDataURL( archivo );
  
   reader.onloadend = () =>{
    this.imagenTemporal = reader.result;
  
   } 
   }
  
  
   cambiarImagen(){
  
    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id)
   }
  


   guardarUsuario( usuario: Usuario ) {

    this._usuarioServices.actualizarUsuario( usuario )
            .subscribe();

            this.router.navigate(['/login']);

  }
  }
  