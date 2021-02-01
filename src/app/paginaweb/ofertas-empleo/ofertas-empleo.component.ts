import { OfertaService } from './../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ofertas-empleo',
  templateUrl: './ofertas-empleo.component.html',
  styleUrls: ['./ofertas-empleo.component.css']
})
export class OfertasEmpleoComponent implements OnInit {


  
  usuario: Usuario;
  
  formularios: Ofertas[];
  ofertaModelo= new Ofertas();
  totalRegistros: number = 1;
  constructor(private listainforme : OfertaService) { }

  ngOnInit(): void {

    this.getFormulariosOfertas()
  }



  
  getFormulariosOfertas() {

  
    this.listainforme.getOpciones().subscribe(
      result => { 
         this.formularios =  result 
         console.log(this.formularios)
     });

  

}



postular(){
  console.log('estoy postulando')
   Swal.fire({
     title: '<strong>REGÍSTRATE EN UNA DE NUESTRAS CATEGORIAS</strong>',
     icon: 'success',
     html:
      
       '<a href="#/home">ENCONTAR EMPLEO</a>' 
   
       
       ,
     showCloseButton: true,
     showCancelButton: true,
     focusConfirm: false,
     confirmButtonText:
       '<i class="fa fa-thumbs-up"></i> <a href="#/home"><b style="color:#FBFBFB";> ENCONTAR EMPLEO </b></a>',
     confirmButtonAriaLabel: 'Thumbs up, great!',
     cancelButtonText:
       '<i class="fa fa-thumbs-down"></i>',
     cancelButtonAriaLabel: 'Thumbs down'
   })
 
 
 }

}
