import { ContactoPostulanteService } from './../../../services/contacto-postulante.service';

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import Swal from 'sweetalert2';
import { Contacto } from 'src/app/models/contactoPOstulante';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  usuario: Usuario;

  postulacionModelo = new Contacto();
  cargando = false;
  formularios: Hojavida[];
  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;
  constructor(private listainforme :HojavidaService, private _contacto: ContactoPostulanteService) { 


  
  }

 
  
  ngOnInit(): void {

    this.getFormulariosOfertas()
  }




  getFormulariosOfertas() {
    
    this.listainforme.getOpciones().subscribe(
      result => { 
        this.formularios =  result ;
         console.log(this.formularios)

     


     });
    }



    postulando = "POSTULADO"
    postular(id) {
      console.log('estoy postulando')
      // Realizar el posteo
  
      this.postulacionModelo.postulacion = id;
      this.postulacionModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    
         this._contacto.addContacto(this.postulacionModelo).subscribe(
        resp => {
             console.log(resp,'Postulación Exitosa')
        //  Swal.fire("Postulación EXITOSA", "", "success")
        //  console.log(resp);
  
        }, (err) => {
  
          //  Swal.fire(this.postulacionModelo.usuario.usuario, err.error.msg, 'error');
  
        })
      
    }


    ActulizarEstado(id) {
    
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
  
     this.postular(id)
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