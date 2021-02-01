import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cursos',
  templateUrl: './crear-cursos.component.html',
  styleUrls: ['./crear-cursos.component.css']
})
export class CrearCursosComponent implements OnInit {

  opcionesGenerales: Categoria[]
  ofertaModelo= new Cursos();
 estado = 'NO PUBLICADO'








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
   private opcionesServices : CategoriasService,
    private cursos : CursosService) { 

    }

 ngOnInit(): void {
   

 
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



 crearCurso() {
   
   console.log( this.registerForm.value );

 //  if ( this.registerForm.invalid ) {
  //   return;
//   }

   // Realizar el posteo

   this.registerForm.value.estado = this.estado
   this.cursos.addCurso(this.registerForm.value).subscribe(
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
