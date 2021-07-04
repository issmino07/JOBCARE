
import { OfertaService } from '../../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-postulaciones-ofertas',
  templateUrl: './postulaciones-ofertas.component.html',
  styleUrls: ['./postulaciones-ofertas.component.css']
})
export class PostulacionesOfertasComponent implements OnInit {

  usuario: Usuario;





  formularios: Ofertas[];
  ofertaModelo= new Ofertas();
  totalRegistros: number = 1;



  constructor( private listainforme: OfertaService
    ) {


     }
  ngOnInit() {



    this.getFormulariosOfertas();

  }






  getFormulariosOfertas() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getOfertas(usuario._id).subscribe(
        result => {
           this.formularios =  result
           console.log(this.formularios,'TODO')

       },error =>{
       console.log(error,'Error')
      //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');


       });



  }

  nohay(){
    Swal.fire(

      'NO HAY',
      'ADJUNTOS EN ESTA HOJA DE VIDA',
      'warning'
    );

  }
}
