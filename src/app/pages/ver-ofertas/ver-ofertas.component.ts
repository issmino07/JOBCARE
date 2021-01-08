import { OfertaService } from './../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-ofertas',
  templateUrl: './ver-ofertas.component.html',
  styleUrls: ['./ver-ofertas.component.css']
})
export class VerOfertasComponent implements OnInit {

  usuario: Usuario;
  
  formularios: Ofertas[];
  ofertaModelo= new Ofertas();
  totalRegistros: number = 1;


  constructor(private _usuarioService: UsuarioService, private listainforme: OfertaService,private route: ActivatedRoute,) { }
  ngOnInit() {

   
    this.usuario = this._usuarioService.usuario;
    this.getFormulariosOfertas();
  }

  getFormulariosOfertas() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getOfertas(usuario._id).subscribe(
        result => { 
           this.formularios =  result 
           console.log(this.formularios)
       });

    
 
  }
}