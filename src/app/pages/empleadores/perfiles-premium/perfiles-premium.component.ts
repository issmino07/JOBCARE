import { ContactoPostulanteService } from './../../../services/contacto-postulante.service';

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import Swal from 'sweetalert2';
import { Contacto } from 'src/app/models/contactoPOstulante';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfiles-premium',
  templateUrl: './perfiles-premium.component.html',
  styleUrls: ['./perfiles-premium.component.css']
})
export class PerfilesPremiumComponent implements OnInit {

  usuario: Usuario;

  postulacionModelo = new Contacto();
  cargando = false;
  formularios: Hojavida[];
  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;
  constructor(private listainforme :HojavidaService, private _contacto: ContactoPostulanteService, public _usuarioServices: UsuarioService,) {

    this.usuario = this._usuarioServices.usuario;

  }



  ngOnInit(): void {

    this.getFormulariosOfertas()
  }




  getFormulariosOfertas() {

    this.listainforme.getOpcionesPremium().subscribe(
      result => {
        this.formularios =  result ;
         console.log(this.formularios)




     });
    }



    postulando = "POSTULADO"
    postular(id,nombre, apellido,descripcion,cedula,ciudad,direccion,categoria, email, telefo,pdf,) {



      // Realizar el posteo
    //  this.postulacionModelo.postulacion = id;
      this.postulacionModelo.telefonoPostulante = telefo
      this.postulacionModelo.emailPostulante = email
      this.postulacionModelo.nombrePostulante = nombre
      this.postulacionModelo.apellidoPostulante= apellido
      this.postulacionModelo.cedulaPostulante = cedula
      this.postulacionModelo.direccionPostulante = descripcion
     this.postulacionModelo.direccionPostulante = direccion
     this.postulacionModelo.categoriaPostulante = categoria
     this.postulacionModelo.ciudadPostulante = ciudad
     this.postulacionModelo.urlPdf = pdf
      this.postulacionModelo.emailEmpleador= this.usuario.email;
      this.postulacionModelo.nombre = this.usuario.usuario
      this.postulacionModelo.telefono = this.usuario.telefono

      this.postulacionModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;

         this._contacto.addContacto(this.postulacionModelo).subscribe(
        resp => {
             console.log(resp,'Postulación Exitosa')
        //  Swal.fire("Postulación EXITOSA", "", "success")
        //  console.log(resp);

        }, (err) => {

        Swal.fire(this.postulacionModelo.usuario.email, err.error.msg, 'error');

        })

    }


    ActulizarEstado(id,nombre, apellido,descripcion,cedula,ciudad,direccion,categoria,email, telefo,pdf, ) {

      this.ofertaModelo._id = id;
    //  this.ofertaModelo.descripcion = this.ID
      this.ofertaModelo.user = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.addOpcion2(this.ofertaModelo).subscribe(
          resp => {

          Swal.fire("Perfil Notificado", "", "success")
       //   console.log(resp);

        }, (err) => {

          Swal.fire(this.ofertaModelo.usuario.usuario, err.error.msg, 'error');

        })

     this.postular(id,nombre, apellido,descripcion,cedula,ciudad,direccion,categoria,email, telefo,pdf, )
    }



 buscarHoja( termino: string ) {

  if ( termino.length <= 0 ) {
    this.getFormulariosOfertas()
    return;
  }

  this.cargando = true;

  this.listainforme.buscarHojavida( termino )
          .subscribe( (hojavida: Hojavida[]) => {

            this.formularios = hojavida

            console.log(this.formularios,'oe')
            this.cargando = false;
          });

}



}
