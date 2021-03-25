import { Categoria } from '../../../models/categoria.model';
import { CategoriasService } from '../../../services/categorias.service';

import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import Stepper from 'bs-stepper';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';

import { NgxSpinnerService } from 'ngx-spinner';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { Plan } from 'src/app/models/planes';

import { UsuarioService } from 'src/app/services/usuario.service';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { Router } from '@angular/router';
import { PlanEmpleadosService } from 'src/app/services/plan-empleados.service';
import { Hojavida } from 'src/app/models/hojavida';

@Component({
  selector: 'app-hojavida-formulario',
  templateUrl: './hojavida-formulario.component.html',
  styleUrls: ['./hojavida-formulario.component.css']
})
export class HojavidaFormularioComponent implements OnInit {

  votes: number = 0;
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: any;
  hojaModelo = new Hojavida();
  opcionesGenerales: Categoria[]
  ofertaModelo = new Ofertas();
  estado = 'NO PUBLICADO'
  estado2 = 'PUBLICADO'
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  tipo = "Free";
  valor = "0.00";

  planModelo = new Plan();
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;
  formularios: Hojavida[];
  //pasos del formulario en una sola pantalla
  private stepper: Stepper;

  next() {
    this.stepper.next();

    // this.actualizarpagina()
  }

  previus() {
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
    genero: [''],
    ocupacion: [''],
    descripcion: [''],
    categorias: [''],
    provincia: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    direccionmapa: ['', [Validators.required]],
    experiencia: ['', [Validators.required]],
    descripcionExperiencia: ['', [Validators.required]],

    nivelEducacion: [''],
    estado: [''],
    usuario: [''],
    img2: [''],

    //referencia1
    nombreRef1: [''],
    cargoRef1: [''],
    empresaRef1: [''],
    telefonoRef1: [''],
    //referencia1
    nombreRef2: [''],
    cargoRef2: [''],
    empresaRef2: [''],
    telefonoRef2: [''],

    //referencia1
    nombreRef3: [''],
    cargoRef3: [''],
    empresaRef3: [''],
    telefonoRef3: [''],

    //  lavado: ['',],
    //  comida: ['',],
    //  limpieza: ['',],
    //  tareas: ['',],
    //  fechaNacimiento: ['', [Validators.required]],






  })

  urlTree
  id
  type

  constructor(private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private ngZone: NgZone, private spinner: NgxSpinnerService,
    private opcionesServices: CategoriasService, private ciudadOpcion: CiudadesService,  public _usuarioServices: UsuarioService,
    private _hojavida: HojavidaService, private router: Router, private planes2: PlanEmpleadosService,) {
    this.usuario = this._usuarioServices.usuario;

    this.urlTree = this.router.parseUrl(this.router.url);

    this.id = this.urlTree.queryParams['id'];
    this.type = this.urlTree.queryParams['clientTransactionId'];


  }

  ngOnInit(): void {


    this.getFormulariosHoja();
    this.confirmacionPago();

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

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
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



  crearUsuarioHoja() {

    console.log(this.registerForm.value);

    //  if ( this.registerForm.invalid ) {
    //   return;
    //   }

    // Realizar el posteo
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.estado = this.estado
    this.registerForm.value.img2 = this.usuario.img;
    this._hojavida.addOpcion(this.registerForm.value).subscribe(
      resp => {
        window.location.reload()
        Swal.fire("Registro  existoso", "", "success")
       

      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');

      }

    )


  }

//========================Trae la Hoja de Vida Guardada y muestra el previo en el steper==============================//
  ID
  getFormulariosHoja() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this._hojavida.getHojavida(usuario._id).subscribe(
      result => {
        this.formularios = result
        this.ID = this.formularios['_id']
        //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )

        for (var form in result) {
          this.ID = result[form]._id
        }

      });
  }

  //=================Actualiza el estado de la publicacion de la hoja de vida una vez que se realiza el pago ===//

  updateEstado(): void {
    this.hojaModelo._id = this.ID;
    this.hojaModelo.estado = this.estado2;
    this._hojavida.updateOpcion(this.hojaModelo)
      .subscribe(result => {
       

        Swal.fire("HOJA DE VIDA PUBLICADA CON EXITO", "", "success")
        // window.location.reload()
      });
  }

  actualizarpagina() {
    window.location.reload()
  }


  voteUp(valor: number) {
    if (this.votes >= 50 && valor >= 0) {
      return this.votes = 50;
    }
    //  this.votes++;
    if (this.votes <= 0 && valor < 0) {
      return this.votes = 0;
    }

    this.votes = this.votes + valor;

  }


  registrarPlan() {

    console.log(this.planModelo);
    // Realizar el posteo
    this.planModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planModelo.tipoPlan = this.tipo
    this.planModelo.valor = this.valor
    this.planes2.addPlan(this.planModelo).subscribe(
      resp => {

        Swal.fire("Suscrito a Plan Free", "", "success")
        console.log(resp);

      }, (err) => {

        Swal.fire(this.planModelo.usuario.usuario, err.error.msg, 'error');

      })

  }

valor1= '5.99'
valor2= '9.99'  
  registrarPlanGeneral() {

    
    // Realizar el posteo
    this.planModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planModelo.amount= this.cantidad;
    if(this.cantidad =="599"){
      this.planModelo.tipoPlan = this.paquete
      this.planModelo.valor = this.valor1
      console.log(this.planModelo.tipoPlan,'PAQUETE')
    }
    else if (this.cantidad =="999"){
      this.planModelo.tipoPlan = this.paquete2
      this.planModelo.valor = this.valor2
      console.log(this.planModelo.tipoPlan,'PAQUETE2')
    }
    this.planModelo.clientTransactionId =this.clientTId
    this.planModelo.optionalParameter1  =this.parametro1
     this.planModelo.optionalParameter2 =this.parametro2
     this.planModelo.reference =this.referencia
  //  this.planModelo.tipoPlan =
    this.planes2.addPlanPago(this.planModelo).subscribe(
      resp => {

        Swal.fire("Suscrito a Plan ", resp.tipoPlan, "success")
        console.log(resp);

      }, (err) => {

        Swal.fire(this.planModelo.usuario.usuario,'Ya estas sucscrito a plan'+ err.error.msg, 'error');

      })

  }

  
 


  seleccionaImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result;

    }
  }


  cambiarImagen() {

    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id)
  }

 
  ///===================prueba botton de pagos========================================//
  apiPay
  rand
  //
  paquete = 'Premium (3 meses)'
  producto1() {

    this.rand = Math.floor((Math.random() * 1000) + 60000);

    let parametros = {
      amount: "599",
      amountWithoutTax: "599",
      clientTransactionID: this.rand,
      responseUrl: "http://localhost:4200/#/dashboard/hojavida",
      cancellationUrl: "http://localhost:4200/#/dashboard/hojavida"

    }
    console.log(parametros.responseUrl)
    this.planes2.pagar(parametros).subscribe(resp => {


      this.apiPay = resp.payWithCard;

      window.location.href = this.apiPay;
    }, (err) => {

      Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

    })
   
  }

 paquete2= 'Premium (6 Meses)'
  producto2() {

    this.rand = Math.floor((Math.random() * 1000) + 90000);
    let parametros = {
      amount: "999",
      amountWithoutTax: "999",
      clientTransactionID: this.rand,
      responseUrl: "http://localhost:4200/#/dashboard/hojavida",
      cancellationUrl: "http://localhost:4200/#/dashboard/hojavida"

    }
    console.log(parametros)
    this.planes2.pagar(parametros).subscribe(resp => {


      this.apiPay = resp.payWithCard;
      window.location.href = this.apiPay;
    }, (err) => {

      Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

    })

  }

  //======================Confirmacion de pago para registro en la base =============//

  //variables de pago
  cantidad
  clientTId
  parametro1
  parametro2
  referencia
  confirmacionPago() {
    let parametros = {
      id: this.id,
      clientTxId: this.type
    }

    if (this.id == 0) {
      Swal.fire('Transacción cancelada', 'vuelva intentar', 'error');
      return false
    } else {
      this.planes2.getPago(parametros).subscribe(resp => {
       
          this.cantidad = resp.amount
          this.clientTId = resp.clientTransactionId
          this.parametro1 = resp.optionalParameter1
          this.parametro2 = resp.optionalParameter2
          this.referencia = resp.reference
        Swal.fire("Pago realizado con exito", resp.clientTransactionId, "success")
        setTimeout(() => {

          this.updateEstado()
          this.registrarPlanGeneral()
        }, 3000);


      }, (err) => {

        // Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

      })

    }


  }


}
