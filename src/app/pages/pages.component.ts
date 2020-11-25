import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function custonmInitFuntions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( setting:SettingsService) { }

  ngOnInit(): void {

  //  custonmInitFuntions();
  
  
  //  href="./assets/css/colors/default-dark.css"
  }

}
