import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
  selector: 'app-editar-ofertas',
  templateUrl: './editar-ofertas.component.html',
  styleUrls: ['./editar-ofertas.component.css']
})
export class EditarOfertasComponent implements OnInit {

  ofertaModelo= new Ofertas();
  opcionesGenerales: Categoria[]
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

  constructor(private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private ngZone: NgZone, private route: ActivatedRoute,
     private oferta : OfertaService, private opcionesServices : CategoriasService,  private location: Location) {


      }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.oferta.getOfertasId(id)
      .subscribe(resp => this.ofertaModelo = resp);
    
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


 


  update(): void {
    //this.submitted = true;
    this.oferta.updateOpcion(this.ofertaModelo)
        .subscribe(result => {
          console.log(result)
          Swal.fire("Actualización de oferta existoso", "", "success")
        });
  }

  updateEstado(): void {
    //this.submitted = true;
    this.oferta.updateOpcion(this.ofertaModelo)
        .subscribe(result => {
          console.log(result)
          Swal.fire("Actualización de Publicación existoso", "", "success")
        });
  }

  delete(): void {
 //   this.submitted = true;
    this.oferta.deleteOpcion(this.ofertaModelo._id)
        .subscribe(
          result => { 
        

            console.log(result)
        });
        this.goBack()
  }
  goBack(): void {
    this.location.back();
  }

}
