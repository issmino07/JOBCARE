import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {

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
