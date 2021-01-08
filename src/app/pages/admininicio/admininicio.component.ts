import { CategoriasService } from './../../services/categorias.service';
import { OfertaService } from './../../services/oferta.service';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { Categoria } from 'src/app/models/categoria.model';
@Component({
  selector: 'app-admininicio',
  templateUrl: './admininicio.component.html',
  styleUrls: ['./admininicio.component.css']
})
export class AdmininicioComponent implements OnInit {

  opcionesGenerales: Categoria[]
   ofertaModelo= new Ofertas();
  estado = 'NO PUBLICADO'
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  public registerForm = this.fb.group({
    tituloEmpleo: ['', [Validators.required]],
    descripcionEmpleo: ['', [Validators.required]],
    remuneracion: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    usuario:[''],
    estado:[''],
    categorias:['']
     //   provincia: ['', [Validators.required]],
  //  ciudad: ['', [Validators.required]],
  //  direccionmapa: ['', [Validators.required]],
  //  lavado: ['',],
  //  comida: ['',],
  //  limpieza: ['',],
  //  tareas: ['',],
  //  fecha: ['', [Validators.required]],

    




  })

  titulo

  constructor(private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private ngZone: NgZone,
    private opcionesServices : CategoriasService,
     private oferta : OfertaService) { 

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


 previo(){

  this.titulo =  this.registerForm.value.tituloEmpleo;
 }

  crearUsuario() {
    
    console.log( this.registerForm.value );

  //  if ( this.registerForm.invalid ) {
   //   return;
 //   }

    // Realizar el posteo
    this.registerForm.value.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.estado = this.estado
    this.oferta.addOpcion(this.registerForm.value).subscribe(
      resp => {
        Swal.fire("Registro  existoso", "", "success")
        console.log(resp);
   
      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');
  
      }

    )


  }


}
