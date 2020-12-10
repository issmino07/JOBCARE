import { CiudadesService } from './../../services/ciudades.service';
import { Ciudad } from './../../models/ciudad.model';
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';

import Stepper from 'bs-stepper';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {


  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  

  //combo de la base de localidades
  ciuadadesOpcion: Ciudad[];
  ciudad:Ciudad;
//=================================

//pasos del formulario en una sola pantalla
  private stepper: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }


 




  constructor( private ciudadOpcion: CiudadesService,  private mapsAPILoader: MapsAPILoader,
  
    private ngZone: NgZone) { }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 48;
        });
      });
    });

   
    this.getOpciones1();
    this.ciuadadesOpcion = new Array<Ciudad>();
    this.ciudad = new Ciudad();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }


    //metodo de las localidades taridas de la base 
    getOpciones1() {
      return this.ciudadOpcion.getOpciones()
        .subscribe(
          ciudades => {
          //  console.log(ciudades);
            this.ciuadadesOpcion = ciudades;
            if(this.ciuadadesOpcion.length > 0){
              this.ciudad = this.ciuadadesOpcion[0];
            }
            
          });

    }

    selectProvincia(provincia){
   
      this.ciudad = this.ciuadadesOpcion.find(element => element.provincia == provincia);
       
    }
   //==================================================================//
   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  markerDragEnd($event: google.maps.MouseEvent) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 28;
          this.address = results[0].formatted_address;
          console.log(this.address)
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


}

