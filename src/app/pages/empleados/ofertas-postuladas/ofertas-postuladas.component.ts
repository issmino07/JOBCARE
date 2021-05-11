import { PostulacionService } from './../../../services/postulacion.service';
import { Postulacion } from 'src/app/models/postulacion';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ofertas-postuladas',
  templateUrl: './ofertas-postuladas.component.html',
  styleUrls: ['./ofertas-postuladas.component.css']
})
export class OfertasPOstuladasComponent implements OnInit {

  formularios: Postulacion[];
  totalRegistros: number = 1;
  hojaModelo = new Postulacion();

  public notificacion = new EventEmitter<any>();
  constructor( private listainforme: PostulacionService,private location: Location,) {


    this.notificacion.subscribe(
      resp =>
      this.getFormulariosOfertas()
    )
   }


  ngOnInit() {

   this.getFormulariosOfertas();

   }

       getFormulariosOfertas() {

       const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
       this.listainforme.getPostulacion(usuario._id).subscribe(
         result => {
            this.formularios =  result;

            console.log(this.formularios,'historial de mis postulaciones')
            },error =>{
        console.log(error,'Error')
       //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
       });
 }


 eliminar(id) {
  Swal.fire({
    title: 'Esta seguro de eliminar su postulación?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'CANCELAR',
    confirmButtonText: 'Si, ELIMINAR',
  }).then((result) => {
    if (result.isConfirmed) {
      this.delete(id);
      Swal.fire('Su postulación !', 'ha sido eliminada.', 'success');
    }
  });
}

delete(_id): void {
  //   this.submitted = true;
  this.listainforme.deletePOstulacion(_id ).subscribe((result) => {
    console.log(result);
    this.notificacion.emit( result);
  });
 // this.goBack();
}

goBack(): void {
  this.location.back();
}
 }
