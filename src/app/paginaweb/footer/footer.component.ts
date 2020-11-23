import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  UrlInicio(){
    window.location.href="#/inicio"; 
    window.scrollTo(0, 0)
    location.reload()
  }

  UrlServicio(){
    window.location.href="#/"; 
    window.scrollTo(0, 0)
    location.reload()
  }

  UrlSobreNosotros(){
    window.location.href="#/";
    window.scrollTo(0, 0);
    location.reload()
  }

  UrlContacto(){
    window.location.href="#/";
    window.scrollTo(0, 0);
    location.reload()
  }

}
