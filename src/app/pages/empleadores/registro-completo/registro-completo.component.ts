import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-completo',
  templateUrl: './registro-completo.component.html',
  styleUrls: ['./registro-completo.component.css']
})
export class RegistroCompletoComponent implements OnInit {
  usuario :Usuario;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;
 //combo de la base de localidades


  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  //=================================

  opcionesGenerales: Categoria[]

  constructor(
    public _usuarioServices: UsuarioService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private ciudadOpcion: CiudadesService,
    private opcionesServices: CategoriasService,
    ) {
    this.usuario = this._usuarioServices.usuario;
  }

  ngOnInit(): void {
   this.getCategorias();
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
  }


  getCategorias() {
    return this.opcionesServices.getOpciones()
      .subscribe(
        opcionesGenerales => {

          this.opcionesGenerales = opcionesGenerales
        }
      );
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



}
