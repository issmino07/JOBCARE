import { Hojavida } from './../../../models/hojavida';
import { PostulacionService } from './../../../services/postulacion.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';
import { Postulacion } from 'src/app/models/postulacion';
import { UsuarioService } from 'src/app/services/usuario.service';


import { HojavidaService } from 'src/app/services/hojavida.service';
import { Mensaje } from 'src/app/models/mensaje';



@Component({
  selector: 'app-ofertas-publicadas',
  templateUrl: './ofertas-publicadas.component.html',
  styleUrls: ['./ofertas-publicadas.component.css']
})
export class OfertasPublicadasComponent implements OnInit {
  usuario: Usuario;

  formulariosPostulacion: Postulacion[];

  postulacionModelo = new Postulacion();

  form: Postulacion[] = [];
  hojas:Hojavida[];
  formularios: Ofertas[];
  ofertaModelo = new Ofertas();
  totalRegistros: number = 1;
  hoja;
  cargando = false;
  

  oferta:Ofertas;
  usuarioLogueado: Usuario;
  mensajes: Array<Mensaje>;
  mensaje: Mensaje;




  constructor(private listainforme: OfertaService, private _postular: PostulacionService, public _usuarioServices: UsuarioService, 
    private listaPostulacion: PostulacionService,
    private _hojaServices: HojavidaService) {
    this.usuario = this._usuarioServices.usuario;

    //  this.st();

    this.mensajes = new Array<Mensaje>();
    this.mensaje = new Mensaje();
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario')) as Usuario;
  }

  ngOnInit() {

    this.getFormulariosOfertas();
    this.getFormulariosHoja();
    this.getFormulariosOfertas2();
  }

  ID
  getFormulariosHoja() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this._hojaServices.getHojavida(usuario._id).subscribe(
      result => { 
         this.hojas =  result 

     
         console.log(this.hojas,'hoja')

         for(var HojaVida in result ){
            
         this.ID = result[HojaVida]._id
      //   console.log(this.ID)
         }
     });
    }


    getFormulariosOfertas2() {
 
      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listaPostulacion.getPostulacion(usuario._id).subscribe(
        result => { 
           this.formulariosPostulacion =  result;

       

           console.log(this.formulariosPostulacion ,'historial de mis postulaciones')
           },error =>{
       console.log(error,'Error')
      //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
      });
}




  getFormulariosOfertas() {
   
     this.listainforme.getOpciones().subscribe(
      result => {
        this.formularios = result

        console.log(this.formularios)
                //  localStorage.setItem("result",JSON.stringify(this.formularios) )
      });
  }

  


  postulando = "POSTULADO"
  postular(id, usuario) {
    console.log('estoy postulando')
    // Realizar el posteo
    this.postulacionModelo.ofertante = usuario;
    this.postulacionModelo.postulacion = id;
    this.postulacionModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
  
       this._postular.addPostulacion(this.postulacionModelo).subscribe(
      resp => {
           console.log(resp,'Postulación Exitosa')
      //  Swal.fire("Postulación EXITOSA", "", "success")
      //  console.log(resp);

      }, (err) => {

        //  Swal.fire(this.postulacionModelo.usuario.usuario, err.error.msg, 'error');

      })
    
  }





  ActulizarEstado(id, usuario) {
    
    this.ofertaModelo._id = id;
    this.ofertaModelo.descripcion = this.ID
    this.ofertaModelo.user = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.addOpcion(this.ofertaModelo).subscribe(
        resp => {

        Swal.fire("Postulación Exitosa", "", "success")
     //   console.log(resp);

      }, (err) => {

        Swal.fire(this.postulacionModelo.usuario.usuario, err.error.msg, 'error');

      })

   this.postular(id,usuario)
  }

  buscarOferta( termino: string ) {

    if ( termino.length <= 0 ) {
      this.getFormulariosOfertas()
      return;
    }
  
    this.cargando = true;
  
    this.listainforme.buscarOfertas( termino )
            .subscribe( (ofertas: Ofertas[]) => {
  
              this.formularios = ofertas
  
              console.log(this.formularios,'oe')
              this.cargando = false;
            });
  
  }

  registrarMensaje() {
    this.mensaje.oferta = this.oferta;
    this.mensaje.usuario = this.usuarioLogueado;
    if (this.usuarioLogueado.role === 'EMPLEADOR_ROLE' || this.usuarioLogueado.role === 'EMPLEADO_ROLE'
     ) {
      this.mensaje.tipoUsuario = 'EMPLEADO_ROLE';
    } else {
      this.mensaje.tipoUsuario = 'EMPLEADOR_ROLE';
    }
   
    this.listainforme.addmensaje( this.mensaje)
      .subscribe(response => {
        this.mensajes = response['data'];
        this.mensaje.mensaje = '';
        
     
      }, error => {
       
      //  swal.fire(this.servicio.obtenerMensaje(error.error.code));
      });
  }



}
