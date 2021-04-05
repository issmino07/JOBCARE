import { Categoria } from '../../../models/categoria.model';
import { CategoriasService } from '../../../services/categorias.service';
import { OfertaService } from '../../../services/oferta.service';
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
import { PlanesService } from 'src/app/services/planes.service';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
@Component({
  selector: 'app-admininicio',
  templateUrl: './admininicio.component.html',
  styleUrls: ['./admininicio.component.css']
})
export class AdmininicioComponent implements OnInit {

 plan :Plan[]
  formularios: Ofertas[];
  opcionesGenerales: Categoria[]
   ofertaModelo= new Ofertas();
  estado = 'NO PUBLICADO'
  etsado2= 'PUBLICADO'
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  OfertaModelo = new Ofertas();
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public formSubmitted = false;
  tipo = "Free";
  valor= "0.00";

  planModelo = new Plan();
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;

   //pasos del formulario en una sola pantalla
   private stepper: Stepper;

   next() {
     this.stepper.next();
     this.previo()
   }

   previus(){
    this.stepper.previous();

   }
 
   onSubmit() {
     return false;
   }


  public registerForm = this.fb.group({
    tituloEmpleo: ['', [Validators.required]],
    descripcionEmpleo: ['', [Validators.required]],
    remuneracion: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    usuario:[''],
    estado:[''],
    categorias:[''],
    provincia: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    TipoPlan: [''],
  //  direccionmapa: ['', [Validators.required]],
  //  lavado: ['',],
  //  comida: ['',],
  //  limpieza: ['',],
  //  tareas: ['',],
  //  fecha: ['', [Validators.required]],

    




  })

  urlTree
  id
  type
 
IDOFERTA
  constructor(private mapsAPILoader: MapsAPILoader, private fb: FormBuilder, private ngZone: NgZone,private spinner: NgxSpinnerService,
    private opcionesServices : CategoriasService,private ciudadOpcion: CiudadesService,private planes : PlanesService,
     private oferta : OfertaService,  private router: Router,) { 

      
    this.urlTree = this.router.parseUrl(this.router.url);

    this.id = this.urlTree.queryParams['id'];
    this.type = this.urlTree.queryParams['clientTransactionId'];
   
     }

  ngOnInit(): void {
    this.confirmacionPago();
    this.getPalnEmpeadores()
    this.getOpciones2();
    this.getFormulariosOfertas()
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

  

  planRegistro
  IDPLAN
  getPalnEmpeadores() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planes.getPlan(usuario._id).subscribe(
      result => { 
         this.plan =  result 
         for (var form in result) {
          this.planRegistro = result[form].tipoPlan;
          this.IDPLAN = result[form]._id
          console.log( this.planRegistro,this.IDPLAN, 'QUE HACES')
          this.updateEstado()
         }
         console.log(this.plan,'planess')
   
     });

  

}

  getFormulariosOfertas() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.oferta.getOfertas(usuario._id).subscribe(
      result => { 
         this.formularios =  result;
         console.log(this.formularios,'LAS OFERTAS QUE TRAE')
         },error =>{
     console.log(error,'Error')
    //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
    });
}

//metodo  categorias
 //opciones generales
 getOpciones1() {
  return this.opcionesServices.getOpciones()
    .subscribe(
      opcionesGenerales => {
    
        this.opcionesGenerales = opcionesGenerales
      }
    );
}


getOpciones2() {
  return this.ciudadOpcion.getOpciones()
    .subscribe(
      ciudades => {
     
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
  
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
   
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 28;
          this.address = results[0].formatted_address;
       
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  titulo;
  ciudadela;
  remu;
  descrip;
  estatus;
  fecha;
 previo(){

  this.titulo =  this.registerForm.value.tituloEmpleo;
  this.ciudadela = this.registerForm.value.ciudad;
  this.remu = this.registerForm.value.remuneracion;
  this.estatus = 'PENDIENTE'
  this.descrip = this.registerForm.value.descripcionEmpleo;
  this.fecha = new Date();
  this.IDOFERTA = localStorage.getItem('Idoferta')


 }

  crearUsuario() {
    

  

    // Realizar el posteo
    this.registerForm.value.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.estado = this.estado;
    this.registerForm.value.tipoPlan = this.planRegistro
    this.formSubmitted = true;


    if (this.registerForm.invalid) {
      return;
    }
    this.oferta.addOpcionOfer(this.registerForm.value).subscribe(
      resp => {
        Swal.fire("Registro  existoso", "", "success")
       
       this.ID =   resp._id 
       this.ID = localStorage.setItem('Idoferta',this.ID)
      

       this.IDOFERTA = localStorage.getItem('Idoferta')
     
      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');
  
      }

      
    )}

     //=================Actualiza el estado de la publicacion de la hoja de vida una vez que se realiza el pago ===//
ID
  updateEstado(): void {
    this.IDOFERTA = localStorage.getItem('Idoferta')
 
    this.ofertaModelo._id = this.IDOFERTA
    this.ofertaModelo.estado = this.etsado2
    this.ofertaModelo.tipoPlan = this.planRegistro
    this.oferta.updateOpcion(this.ofertaModelo)
      .subscribe(result => {
       
        
        Swal.fire("OFERTA PUBLICADA CON EXITO", "", "success")
        // window.location.reload()
      });
  }


  registrarPlan() {
    

  // Realizar el posteo
    this.planModelo.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planModelo.tipoPlan = this.tipo
    this.planModelo.valor = this.valor
    this.planes.addPlan(this.planModelo).subscribe(
      resp => {
       
        Swal.fire("Suscrito a Plan Free", "", "success")
      
       
      }, (err) => {
        
        Swal.fire(this.planModelo.usuario.usuario, err.error.msg, 'error');
  
      })
   
    }


    activar(){
      this.ocultar = true;
     
    }

    ocultar = false

    get myStyles(): any {
  
      return {
          'display' : this.ocultar ? '': 'none'
         
      }
   
  }

    ///===================prueba botton de pagos========================================//

    //https://jobandcare.com/
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
        responseUrl: URL_SERVICIOS+"/#/dashboard/admininico",
        cancellationUrl:URL_SERVICIOS+ "/#/dashboard/admininico"
  
      }
   
      this.planes.pagar(parametros).subscribe(resp => {
  
  
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
        responseUrl:URL_SERVICIOS + "/#/dashboard/admininico",
        cancellationUrl: URL_SERVICIOS+ "/#/dashboard/admininico"
  
      }
   
      this.planes.pagar(parametros).subscribe(resp => {
  
  
        this.apiPay = resp.payWithCard;
        window.location.href = this.apiPay;
      }, (err) => {
  
        Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');
  
      })
  
    }

    valor1= '5.99'
valor2= '9.99'  
  registrarPlanGeneral() {

    
    // Realizar el posteo
   // this.planModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
   this.planModelo._id = this.IDPLAN;
    this.planModelo.amount= this.cantidad;
    if(this.cantidad =="599"){
      this.planModelo.tipoPlan = this.paquete
      this.planModelo.valor = this.valor1
 
    }
    else if (this.cantidad =="999"){
      this.planModelo.tipoPlan = this.paquete2
      this.planModelo.valor = this.valor2
   
    }
    this.planModelo.clientTransactionId =this.clientTId
    this.planModelo.optionalParameter1  =this.parametro1
     this.planModelo.optionalParameter2 =this.parametro2
     this.planModelo.reference =this.referencia
  //  this.planModelo.tipoPlan =
    this.planes.updatePlan(this.planModelo).subscribe(
      resp => {

        Swal.fire("Suscrito a Plan ", resp.tipoPlan, "success")
       
        this.updateEstado()
      }, (err) => {

        Swal.fire(this.planModelo.usuario.usuario,'Ya estas sucscrito a plan'+ err.error.msg, 'error');
        this.updateEstado()
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

      this.IDOFERTA = localStorage.getItem('Idoferta')
     
      let parametros = {
        id: this.id,
        clientTxId: this.type
      }
  
      if (this.id == 0) {
        Swal.fire('Transacción cancelada', 'vuelva intentar', 'error');
        return false
      } else {
        this.planes.getPago(parametros).subscribe(resp => {
         
            this.cantidad = resp.amount
            this.clientTId = resp.clientTransactionId
            this.parametro1 = resp.optionalParameter1
            this.parametro2 = resp.optionalParameter2
            this.referencia = resp.reference
          Swal.fire("Pago realizado con exito", resp.clientTransactionId, "success")
          this.registrarPlanGeneral()
          setTimeout(() => {
          
           this.updateEstado()
           // this.registrarPlanGeneral()
          }, 3000);
  
  
        }, (err) => {
  
          // Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');
          }) }
          }


          campoNoValido(campo: string): boolean {

            if (this.registerForm.get(campo).invalid && this.formSubmitted) {
        
              return true
            } else {
        
              return false;
            }
          }
  

}
