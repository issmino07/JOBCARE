import { OfertaService } from './../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';

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

}
