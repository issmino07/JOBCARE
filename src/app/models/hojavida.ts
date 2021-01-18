
import { Usuario } from './usuario.model';
export class Hojavida {
    _id : string;
      nombre: String;
      apellido: String;
      cedula: String;
      refSalarial: string;
      fechaNacimiento: Date;
      edad: String;
      genero:string;
      ocupacion: string;
      descripcion: string;
      categorias: string;
      provincia:string;
      ciudad: string;
      direccion: string;
      direccionMapa: string;
      experiencia:string;
      descripcionExperiencia: string;
      nivelEducacion: string;
      estado: string;
      usuario:Usuario;
}