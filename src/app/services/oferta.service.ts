import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ofertas } from '../models/ofertas';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private opcionesUrl1 =  environment.base_url + '/ofertas/todos';
  private opcionesUrl =  environment.base_url + '/ofertas';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }
 
  getOpciones(): Observable<Ofertas[]> {
    return this.http.get<Ofertas[]>(this.opcionesUrl1)
  }

  getOfertasId(id: string): Observable<Ofertas> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Ofertas>(url);
  }

  getOfertas (usuario_id:string): Observable<Ofertas[]> {
    return this.http.get<Ofertas[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }



  addOpcion (proveedor: Ofertas): Observable<Ofertas> {
    return this.http.post<Ofertas>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion (opcion: Ofertas | string): Observable<Ofertas> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Ofertas>(url, httpOptions);
  }

  updateOpcion (proveedor: Ofertas): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }



}
