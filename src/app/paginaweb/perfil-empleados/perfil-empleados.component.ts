import { HojavidaService } from './../../services/hojavida.service';
import { Hojavida } from './../../models/hojavida';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-empleados',
  templateUrl: './perfil-empleados.component.html',
  styleUrls: ['./perfil-empleados.component.css']
})
export class PerfilEmpleadosComponent implements OnInit {

  usuario: Usuario;

  

  formularios: Hojavida[];
  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;
  constructor(private listainforme :HojavidaService,private fb: FormBuilder) { 


  
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


postular(){
  console.log('estoy postulando')
   Swal.fire({
     title: '<strong>REGÍSTRATE EN UNA DE NUESTRAS CATEGORIAS</strong>',
     icon: 'success',
     html:
      
       '<a href="#/home2">PUBLICAR EMPLEO</a>' 
   
       
       ,
     showCloseButton: true,
     showCancelButton: true,
     focusConfirm: false,
     confirmButtonText:
       '<i class="fa fa-thumbs-up"></i> <a href="#/home2"><b style="color:#FBFBFB";> PUBLICAR EMPLEO</b></a>',
     confirmButtonAriaLabel: 'Thumbs up, great!',
     cancelButtonText:
       '<i class="fa fa-thumbs-down"></i>',
     cancelButtonAriaLabel: 'Thumbs down'
   })
 
 
 }




}
