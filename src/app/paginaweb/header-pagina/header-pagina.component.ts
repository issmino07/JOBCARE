import { Component, Input, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-header-pagina',
  templateUrl: './header-pagina.component.html',
  styleUrls: ['./header-pagina.component.css']
})
export class HeaderPaginaComponent implements OnInit {




    //pasos del formulario en una sola pantalla

  @Input() activeNav: boolean;
  @Input() servicioNav: boolean;
  @Input() experienciaNav: boolean;
  @Input() procesoNav: boolean;
  @Input() inicioNav: boolean;

  
  constructor() {
    this.activeNav = false;
    this.servicioNav = false;
    this.experienciaNav = false;
    this.procesoNav = false;
    this.inicioNav = false;
   }

   URL="http://localhost:4200/"

  ngOnInit() {

  
  }

  UrlInicio(){
    window.location.href="#/inicio"; 
    //  window.scrollTo(0, 0)
     // location.reload()
    location.reload();
  }

  UrlOfertas(){
    window.location.href="#/ofertaEmpleo"; 
  //  window.scrollTo(0, 0)
   // location.reload()
  location.reload();
  }

  perfilEmpleados

  UrlPerfil(){
    window.location.href="#/perfilEmpleados"; 
    window.scrollTo(0, 0)
    location.reload()
  }

  UrlServicio(){}

  UrlServicioGestion(){
    window.location.href="#/Servicios"; 
    window.scrollTo(0, 650)
  }

  UrlSobreNosotros(){
    window.location.href="#/Sobre Nosotros";
    window.scrollTo(0, 0);
    location.reload()
  }

  UrlSobreNosotrosVision(){
    window.location.href="#/Sobre Nosotros";
    window.scrollTo(0, 600);
    location.reload()
  }

  UrlExperiencia(){
    window.location.href="#/experiencia";
    window.scrollTo(0, 0);
    location.reload()
  }

  UrlExperienciaCliente(){
    window.location.href="#/experiencia";
    location.reload();
    window.scrollTo(0, 850);
    
  }

  UrlprocesoCalificacion(){
    window.location.href="#/procesoCalificacion";
    window.scrollTo(0, 0);
    location.reload()
  }

  UrlprocesoCalificacionPerfil(){
    window.location.href="#/procesoCalificacion";
    location.reload()
    window.scrollTo(0, 470);
  }

  UrlprocesoCalificacionProceso(){
    window.location.href="#/procesoCalificacion";
    location.reload()
    window.scrollTo(0, 1350);
  }

  UrlContacto(){
    window.location.href="#/contacto";
    window.scrollTo(0, 0);
    location.reload()
  }

      

 
""  

  presionar(){
    window.location.href= "#/nineraEmpleador";

  location.reload()
  }
  presionar1(){
    window.location.href="#/cuidadoAdultoEmpleador";
   
    location.reload()
  }
  presionar2(){
    window.location.href="#/domesticoEmpleador";
   // window.scrollTo(0, 600);
   
   location.reload()
  }

  presionar3(){
    window.location.href="#/mascotaEmpleador";
  //  window.scrollTo(0, 600);
    
    location.reload()
  }

  presionar4(){
    window.location.href="#/spaEmpleador";
   // window.scrollTo(0, 600);
    
    location.reload()
  }
  presionar5(){
    window.location.href="#/capacidadesEmpleador";
   // window.scrollTo(0, 600);
    
    location.reload()
  }
  presionar6(){
    window.location.href="#/tutoriasEmpleador";
   // window.scrollTo(0, 600);
    location.reload()
  }
  presionar7(){
    window.location.href="#/trabajosEmpleador";
  //  window.scrollTo(0, 600);
    
    location.reload()
  }
  presionar8(){
    window.location.href="#/asistenciaEmpleador";
  //  window.scrollTo(0, 600);
    
    location.reload()
  }
  presionar9(){
    window.location.href="#/mensajeriaEmpleador";
  //  window.scrollTo(0, 600);
    
    location.reload()
  }
  presionar10(){
    window.location.href="#/profesionalEmpleador";
   // window.scrollTo(0, 600);
    location.reload()
  }
}
