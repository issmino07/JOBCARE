import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ofertas-publicadas',
  templateUrl: './ofertas-publicadas.component.html',
  styleUrls: ['./ofertas-publicadas.component.css']
})
export class OfertasPublicadasComponent implements OnInit {
  usuario: Usuario;
  
  formularios: Ofertas[];
  ofertaModelo= new Ofertas();
  totalRegistros: number = 1;
  constructor(private listainforme : OfertaService) { }

  ngOnInit() {

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
    title: '<strong>REGISTRATE EN UNA DE NUESTRAS CATEGORIAS</strong>',
    icon: 'success',
    html:
     
      '<a href="#/home">ENCONTAR EMPLEO</a>' 
  
      
      ,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down'
  })


}

}
