import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-te-contactaron',
  templateUrl: './te-contactaron.component.html',
  styleUrls: ['./te-contactaron.component.css']
})
export class TeContactaronComponent implements OnInit {

  usuario: Usuario;


 

  
  formularios: Hojavida[];
  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;
  
    

  constructor( private listainforme: HojavidaService
    ) {


     }
  ngOnInit() {


  
    this.getFormulariosOfertas();
 
  }



 
 

  getFormulariosOfertas() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getHojavida(usuario._id).subscribe(
        result => { 
           this.formularios =  result
           console.log(this.formularios,'TODO contacto')
       
       },error =>{
       console.log(error,'Error')
      //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');


       });

    
 
  }
}