
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

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

}
