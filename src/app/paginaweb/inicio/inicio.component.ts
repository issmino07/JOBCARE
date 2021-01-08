import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


 // @ViewChild(ModalesPaginaComponent,{static:false}) solicitar: ModalesPaginaComponent;

ocultar = false

  constructor() { }

  ngOnInit(): void {


  }

  activar(){
    this.ocultar = true;
    setTimeout(() => {
    this.desactivar()

    },10000);
  }
  desactivar(){
    this.ocultar = false;

   
  }

   get myStyles(): any {
  
        return {
            'display' : this.ocultar ? '': 'none'
           
        }
     
    }

}
