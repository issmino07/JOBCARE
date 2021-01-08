import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-pagina',
  templateUrl: './header-pagina.component.html',
  styleUrls: ['./header-pagina.component.css']
})
export class HeaderPaginaComponent implements OnInit {


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
