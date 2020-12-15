
import { CiudadesService } from './../../services/ciudades.service';
import { Ciudad } from './../../models/ciudad.model';
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';

import Stepper from 'bs-stepper';
import { MapsAPILoader } from '@agm/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ninera',
  templateUrl: './ninera.component.html',
  styleUrls: ['./ninera.component.css']
})
export class NineraComponent implements OnInit {



  votes: number;

  mostarDatos: boolean;
  mostarDatossemana: boolean;
  mostarDatosmes: boolean;
  mostarDatosfijo: boolean;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  //combo de la base de localidades
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;
  //=================================

  //pasos del formulario en una sola pantalla
  private stepper: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  // formulario de registro //
  public formSubmitted = false;

  public registerForm = this.fb.group({
    usuario: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
   
    lavado: ['',],
    comida: ['',],
    limpieza: ['', ],
    tareas: ['',],
    fecha: ['', [Validators.required]],
   
    experiencia:[''],
    ninos: this.fb.array([])




  })

get ninos(){
  return this.registerForm.get('ninos') as FormArray;

}

agregarninos(){
 
  const ninosFormgroup =  this.fb.group({
    nino:'',
    masculino: '',
    femenino:'',
    edad:'',
  

  });

  this.ninos.push(ninosFormgroup);

}

removerninos(indice:number){

  this.ninos.removeAt(indice)

}


  constructor(private ciudadOpcion: CiudadesService, private mapsAPILoader: MapsAPILoader, private fb: FormBuilder,

    private ngZone: NgZone) {
    this.votes = this.votes || 0;
  }

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
          if (this.ciuadadesOpcion.length > 0) {
            this.ciudad = this.ciuadadesOpcion[0];
          }

        });

  }

  selectProvincia(provincia) {

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

  activar() {

    this.mostarDatos = true;
    this.mostarDatossemana = false;
    this.mostarDatosfijo = false;
    this.mostarDatosmes = false;

  }
  activar2() {
    this.mostarDatos = false;
    this.mostarDatosmes = false;
    this.mostarDatossemana = true;

  }
  activar3() {
    this.mostarDatossemana = false;

    this.mostarDatosfijo = false;
    this.mostarDatosmes = true;

  }
  activar4() {
    this.mostarDatosmes = false;
    this.mostarDatos = false;
    this.mostarDatosfijo = true;

  }
  desactivar() {

    this.mostarDatos = false;
    this.mostarDatossemana = false;
    this.mostarDatosfijo = false;
    this.mostarDatosmes = false;

  }
  voteUp(): void {
    this.votes++;
    this.agregarninos();
  }

  voteDown(): void {
    this.votes--;
    this.removerninos(0)
  }



  //====CREAR USUARIO==//

 crearUsuario(){
   this. formSubmitted = true;
  console.log(this.registerForm.value)
 }
 

}
