import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contactoPOstulante';
import { Usuario } from 'src/app/models/usuario.model';
import { ContactoPostulanteService } from 'src/app/services/contacto-postulante.service';

@Component({
  selector: 'app-postulantes-contactados',
  templateUrl: './postulantes-contactados.component.html',
  styleUrls: ['./postulantes-contactados.component.css']
})
export class PostulantesContactadosComponent implements OnInit {

  formularios: Contacto[];
  totalRegistros: number = 1;
   
  constructor( private listainforme:  ContactoPostulanteService) { }
  
  
  ngOnInit() {
      
   this.getFormulariosOfertas();
  
   }
 
       getFormulariosOfertas() {
 
       const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
       this.listainforme.getContacto(usuario._id).subscribe(
         result => { 
            this.formularios =  result;

            console.log(this.formularios,'historial de mis contactos')
            },error =>{
        console.log(error,'Error')
       //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
       });
 }
 }

