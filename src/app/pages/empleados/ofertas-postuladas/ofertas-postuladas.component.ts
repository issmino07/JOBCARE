import { PostulacionService } from './../../../services/postulacion.service';
import { Postulacion } from 'src/app/models/postulacion';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-ofertas-postuladas',
  templateUrl: './ofertas-postuladas.component.html',
  styleUrls: ['./ofertas-postuladas.component.css']
})
export class OfertasPOstuladasComponent implements OnInit {

  formularios: Postulacion[];
  totalRegistros: number = 1;
   
  constructor( private listainforme: PostulacionService) { }
  
  
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
 }
