import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/planes';
import { Usuario } from '../models/usuario.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PlanesService {



  public notificacion = new EventEmitter<any>();
  private opcionesUrl =  environment.base_url + '/planes';  // URL to web api
  private opcionesUrl2 =  environment.base_url + '/usuarios/plan';  // URL to web api
  constructor(private http: HttpClient) { }




  addPlan (proveedor: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.opcionesUrl, proveedor, httpOptions);
  }

  getPlan (usuario_id:string): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }

  updateUsuario (proveedor: Usuario): Observable<any> {
    return this.http.put(this.opcionesUrl2, proveedor, httpOptions);
  }


}
