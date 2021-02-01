import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-empleadores',
  templateUrl: './cursos-empleadores.component.html',
  styleUrls: ['./cursos-empleadores.component.css']
})
export class CursosEmpleadoresComponent implements OnInit {

  formularios: Cursos[];
  ofertaModelo= new Cursos();
  totalRegistros: number = 1;

 ocultar = true
  

  constructor( private listainforme: CursosService,private route: ActivatedRoute,
    ) { }
  ngOnInit() {

   

    this.getFormulariosOfertas();
 
  }

  activar(){
    this.ocultar = true;
 
  }
  desactivar(){
    this.ocultar = false;

   
  }

   get myStyles(): any {
  
        return {
            'display' : this.ocultar ? '': 'none'
           
        }
     
    }
 

  getFormulariosOfertas() {

  
      this.listainforme.getCursos().subscribe(
        result => { 
           this.formularios =  result 
           console.log(this.formularios)
       });

    
 
  }


 
}