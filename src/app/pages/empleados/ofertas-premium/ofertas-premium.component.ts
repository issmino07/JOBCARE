import { Hojavida } from './../../../models/hojavida';
import { PostulacionService } from './../../../services/postulacion.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';
import { Postulacion } from 'src/app/models/postulacion';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Notification } from 'src/app/models/notification';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-ofertas-premium',
  templateUrl: './ofertas-premium.component.html',
  styleUrls: ['./ofertas-premium.component.css']
})
export class OfertasPremiumComponent implements OnInit {
  usuario: Usuario;

  formulariosPostulacion: Postulacion[];
  notification = new Notification();
  postulacionModelo = new Postulacion();

  form: Postulacion[] = [];
  hojas:Hojavida[];
  formularios: Ofertas[];
  ofertaModelo = new Ofertas();
  totalRegistros: number = 1;
  hoja;
  cargando = false;





  constructor(private listainforme: OfertaService,
    private _postular: PostulacionService,
    public _usuarioServices: UsuarioService,
    private listaPostulacion: PostulacionService,
    private _hojaServices: HojavidaService,
    private _notificationService: GeneralService
    ) {
    this.usuario = this._usuarioServices.usuario;

    //  this.st();
  }

  ngOnInit() {

    this.getFormulariosOfertas();
    this.getFormulariosHoja();
    this.getFormulariosOfertas2();
  }

  ID
  urlPdf
  nom
  getFormulariosHoja() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this._hojaServices.getHojavida(usuario._id).subscribe(
      result => {
         this.hojas =  result


         console.log(this.hojas,'hoja')

         for(var HojaVida in result ){

         this.ID = result[HojaVida]._id
         this.urlPdf = result[HojaVida].urlPdf
         this.nom = result[HojaVida].nombre
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
        Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
      });
}




  getFormulariosOfertas() {

     this.listainforme.getOpcionesPremium().subscribe(
      result => {
        this.formularios = result

        console.log(this.formularios)
                //  localStorage.setItem("result",JSON.stringify(this.formularios) )
      });
  }



  postulando = "POSTULADO"
  postular(id, usuario,email, titulo, remu, salario,categoria, ciudad, tele,) {
    console.log('estoy postulando')
    // Realizar el posteo
    this.postulacionModelo.emailOfertante = email
    this.postulacionModelo.ofertante = usuario;
    this.postulacionModelo.postulacion = id;
    this.postulacionModelo.estado = this.postulando
    this.postulacionModelo.urlPdf = this.urlPdf
    this.postulacionModelo.nombre = this.nom

    this.postulacionModelo.tituloEmpleo = titulo;
    this.postulacionModelo.remuneracion = remu;
    this.postulacionModelo.salario = salario;
    this.postulacionModelo.categoria = categoria;
    this.postulacionModelo.ciudad = ciudad;

    this.postulacionModelo.telefonoEmpleador = tele;
    this.postulacionModelo.telefono = this.usuario.telefono
    this.postulacionModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;

       this._postular.addPostulacion(this.postulacionModelo).subscribe(
      resp => {
           console.log(resp,'Postulación Exitosa')
      //  Swal.fire("Postulación EXITOSA", "", "success")
      //  console.log(resp);

       // Send Notification
       this.notification.title = titulo;
       this.notification.detalle = 'Solicitud para este empleo';
       this.notification.uri = id;
       this.notification.receiver =usuario;
       this.notification.trasmitter = JSON.parse(localStorage.getItem('usuario')) as Usuario;;
       this.notification.view = false;

       this._notificationService
         .create(this.notification, `notification`)
         .subscribe(
           (res) => {
             Swal.fire(
               'Postulación Exitosa',
               '',
               'success'
             );
           },
           (err) => {
             console.error(err);
           }
         );


      }, (err) => {

          Swal.fire(this.postulacionModelo.usuario.usuario, err.error.msg, 'error');

      })

  }




 post= "POSTULADO"
  ActulizarEstado(id, usuario,email, titulo, remu, salario,categoria, ciudad, tele,) {

    this.ofertaModelo._id = id;
    this.ofertaModelo.descripcion = this.ID;
    this.ofertaModelo.estatus = this.post;
    this.ofertaModelo.user = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.addOpcion(this.ofertaModelo).subscribe(
        resp => {

        Swal.fire("Postulación Exitosa", "", "success")
     //   console.log(resp);

      }, (err) => {

        Swal.fire(this.postulacionModelo.usuario.usuario, err.error.msg, 'error');

      })

   this.postular(id, usuario,email, titulo, remu, salario,categoria, ciudad, tele,)
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


}

