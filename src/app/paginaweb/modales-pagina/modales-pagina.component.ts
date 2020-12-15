import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modales-pagina',
  templateUrl: './modales-pagina.component.html',
  styleUrls: ['./modales-pagina.component.css']
})
export class ModalesPaginaComponent implements OnInit {


  element: HTMLElement;
  constructor() { }

  ngOnInit(): void {
  }


  modalninera(){

    this.element = document.getElementById('#ninera') as HTMLElement;
    this.element.click();

  }

}
