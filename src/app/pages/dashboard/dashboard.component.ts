import { Component, OnInit } from '@angular/core';
declare function customInitFunctions();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { 
    customInitFunctions();
  }

  ngOnInit(): void {
    customInitFunctions();
  }

}
