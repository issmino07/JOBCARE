import { Categoria } from './../../models/categoria.model';
import { CategoriasService } from './../../services/categorias.service';

import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import Stepper from 'bs-stepper';

import { Usuario } from 'src/app/models/usuario.model';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { Plan } from 'src/app/models/planes';
import { PlanesService } from 'src/app/services/planes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-hojavida',
  templateUrl: './editar-hojavida.component.html',
  styleUrls: ['./editar-hojavida.component.css']
})
export class EditarHojavidaComponent implements OnInit {


  votes: number = 0;
  usuario :Usuario;
  imagenSubir: File;
  imagenTemporal: any;

  opcionesGenerales: Categoria[]
 // ofertaModelo= new Ofertas();
  hojaModelo= new Hojavida();
 estado = 'NO PUBLICADO'
 latitude: number;
 longitude: number;
 zoom: number;
 address: string;
 private geoCoder;

 @ViewChild('search')
 public searchElementRef: ElementRef;

 tipo = "Free";
 valor= "0.00";

 planModelo = new Plan();
 ciuadadesOpcion: Ciudad[];
 ciudad: Ciudad;

  //pasos del formulario en una sola pantalla
  private stepper: Stepper;

  next() {
    this.stepper.next();

  }

  previus(){
   this.stepper.previous();

  }

  onSubmit() {
    return false;
  }


 public registerForm = this.fb.group({
   nombre: ['', [Validators.required]],
   apellido: ['', [Validators.required]],
   cedula: ['', [Validators.required]],
   refSalarial: ['', [Validators.required]],
   fechaNacimiento: ['', [Validators.required]],
   edad: ['', [Validators.required]],
   genero:[''],
   ocupacion:[''],
   descripcion:[''],
   categorias:[''],
   provincia: ['', [Validators.required]],
   ciudad: ['', [Validators.required]],
   direccion: ['', [Validators.required]],
   direccionmapa: ['', [Validators.required]],
   experiencia: ['', [Validators.required]],
   descripcionExperiencia: ['', [Validators.required]],
  
   nivelEducacion:[''],
   estado:[''],
   usuario:[''],
 
  

 //  lavado: ['',],
 //  comida: ['',],
 //  limpieza: ['',],
 //  tareas: ['',],
 //  fechaNacimiento: ['', [Validators.required]],

   




 })



 constructor(private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private ngZone: NgZone,private spinner: NgxSpinnerService,
   private opcionesServices : CategoriasService,private ciudadOpcion: CiudadesService,private planes : PlanesService,public _usuarioServices: UsuarioService,
    private _hojavida : HojavidaService, private route: ActivatedRoute,private location: Location) { 
      this.usuario = this._usuarioServices.usuario;

    }

 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this._hojavida.getHojavidaId(id)
    .subscribe(resp => this.hojaModelo = resp);

   this.getOpciones2();
   this.ciuadadesOpcion = new Array<Ciudad>();
   this.ciudad = new Ciudad();
   
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
         this.getAddress(this.latitude, this.longitude);
         this.zoom = 48;
       });
     });
   });
 
  this.getOpciones1()


 }

//metodo  categorias
//opciones generales
getOpciones1() {
 return this.opcionesServices.getOpciones()
   .subscribe(
     opcionesGenerales => {
       console.log(opcionesGenerales);
       this.opcionesGenerales = opcionesGenerales
     }
   );
}


getOpciones2() {
 return this.ciudadOpcion.getOpciones()
   .subscribe(
     ciudades => {
         console.log(ciudades);
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

 update(): void {
  //this.submitted = true;
  this._hojavida.updateOpcion(this.hojaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de oferta existoso", "", "success")
      });
}

updateEstado(): void {
  //this.submitted = true;
  this._hojavida.updateOpcion(this.hojaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de Publicación existoso", "", "success")
      });
}

delete(): void {
//   this.submitted = true;
  this._hojavida.deleteOpcion(this.hojaModelo._id)
      .subscribe(
        result => { 
      

          console.log(result)
      });
      this.goBack()
}



voteUp(valor: number) {
  if(this.votes >= 50 && valor >= 0){
    return this.votes = 50;
  }
  //  this.votes++;
  if(this.votes <= 0 && valor < 0){
    return this.votes = 0;
  }
  
   this.votes = this.votes + valor;

  }


 registrarPlan() {
   
   console.log( this.planModelo);
 // Realizar el posteo
   this.planModelo.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;
   this.planModelo.tipoPlan = this.tipo
   this.planModelo.valor = this.valor
   this.planes.addPlan(this.planModelo).subscribe(
     resp => {
      
       Swal.fire("Suscrito a Plan Free", "", "success")
       console.log(resp);
      
     }, (err) => {
       
       Swal.fire(this.planModelo.usuario.usuario, err.error.msg, 'error');
 
     })

   }


   seleccionaImagen( archivo: File){
     
    if(!archivo){
      this.imagenSubir = null;
     return;
    }
  
    this.imagenSubir = archivo;
   console.log(event);
  
   let reader = new FileReader();
   let urlImagenTemp = reader.readAsDataURL( archivo );
  
   reader.onloadend = () =>{
    this.imagenTemporal = reader.result;
  
   } 
   }
  
  
   cambiarImagen(){
  
    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id)
   }
goBack(): void {
  this.location.back();
}








}
