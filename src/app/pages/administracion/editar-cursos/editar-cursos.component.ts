import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.css']
})
export class EditarCursosComponent implements OnInit {

  opcionesGenerales: Categoria[]
  ofertaModelo= new Cursos();









 public registerForm = this.fb.group({
   tituloCurso: ['', [Validators.required]],
   descripcionCurso: ['', [Validators.required]],
   
   valor: ['', [Validators.required]],
 
  
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



 constructor( private fb: FormBuilder,
   private opcionesServices : CategoriasService,private location: Location,private route: ActivatedRoute,
    private cursos : CursosService) { 

    }

 ngOnInit(): void {
   

  const id = this.route.snapshot.paramMap.get('id');
  this.cursos.getCursosId(id)
    .subscribe(resp => this.ofertaModelo = resp);
 
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




update(): void {
  //this.submitted = true;
  this.cursos.updateCurso(this.ofertaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de oferta existoso", "", "success")
      });
}

updateEstado(): void {
  //this.submitted = true;
  this.cursos.updateCurso(this.ofertaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de Publicación existoso", "", "success")
      });
}

delete(): void {
//   this.submitted = true;
  this.cursos.deleteCurso(this.ofertaModelo._id)
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




