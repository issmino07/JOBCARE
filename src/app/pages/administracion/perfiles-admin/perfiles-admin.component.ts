import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Hojavida } from 'src/app/models/hojavida';
import { Usuario } from 'src/app/models/usuario.model';
import { HojavidaService } from 'src/app/services/hojavida.service';

@Component({
  selector: 'app-perfiles-admin',
  templateUrl: './perfiles-admin.component.html',
  styleUrls: ['./perfiles-admin.component.css']
})
export class PerfilesAdminComponent implements OnInit {

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
