import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hojavida } from '../models/hojavida';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HojavidaService {

  private opcionesUrl1 =  environment.base_url + '/hojavida/todos';
  private opcionesUrl =  environment.base_url + '/hojavida';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }
 
   getOpciones(): Observable<Hojavida[]> {
    return this.http.get<Hojavida[]>(this.opcionesUrl1)
  }  

  getHojavidaId(id: string): Observable<Hojavida> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Hojavida>(url);
  }

  getHojavida (usuario_id:string): Observable<Hojavida[]> {
    return this.http.get<Hojavida[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }



  addOpcion (proveedor: Hojavida): Observable<Hojavida> {
    return this.http.post<Hojavida>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion (opcion: Hojavida | string): Observable<Hojavida> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Hojavida>(url, httpOptions);
  }

  updateOpcion (proveedor: Hojavida): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }


}