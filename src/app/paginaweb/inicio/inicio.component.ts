import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalesPaginaComponent } from '../modales-pagina/modales-pagina.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  @ViewChild(ModalesPaginaComponent,{static:false}) solicitar: ModalesPaginaComponent;

  constructor() { }

  ngOnInit(): void {


  }

  nineramodal(){

  this.solicitar.modalninera()

  }

}
