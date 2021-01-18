import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planempleados } from '../models/planEmpleados';
import { Usuario } from '../models/usuario.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlanEmpleadosService {


  private opcionesUrl =  environment.base_url + '/planempleados';  // URL to web api
  private opcionesUrl2 =  environment.base_url + '/usuarios/planempleados';  // URL to web api
  constructor(private http: HttpClient) { }




  addPlan (proveedor: Planempleados): Observable<Planempleados> {
    return this.http.post<Planempleados>(this.opcionesUrl, proveedor, httpOptions);
  }

  getPlan (usuario_id:string): Observable<Planempleados[]> {
    return this.http.get<Planempleados[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }

  updateUsuario (proveedor: Usuario): Observable<any> {
    return this.http.put(this.opcionesUrl2, proveedor, httpOptions);
  }


}
