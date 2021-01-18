import { Usuario } from "./usuario.model";

export class Ofertas {

 _id: string;
 tituloEmpleo: string;
 descripcionEmpleo: string;
 valor:number;
 horario:string;
 direccion:string;
 remuneracion: string;
 usuario:Usuario;
estado: String;
categorias: string;
provincia:  string;

ciudad: string;
}
