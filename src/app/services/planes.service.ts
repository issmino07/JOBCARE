import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/planes';
import { Usuario } from '../models/usuario.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpBearer ={
  headers:new HttpHeaders({ 'Content-Type': 'application/json','Authorization': "Bearer fv01qT7TNHcTsbqes24kXNKL_kKG-XD3u8vlpyhgN3hIe4cAUJylfFJ-KG-zDJ00tyACH-3bV4XPmMSQKh276SIFTlo9shs_l9OJX2hsfW5T_zkY42oXj9cG3i20m20ZEgFA2EXiCHf6v8rZhLjCiKm33ujge_sZhMYzHOIZK4BnaJtdz-FY5gmo_GxXW7EJQra_etzO_Mx6xQ67evf2adBJPaAsWYqHa5LjoAjkdiVfE7Rloivq67QYy0mPHDVGciAaXwoi4wyu8eVCqQEfOggUVGaIaHHp1r9A3R7d5AQkmk31ebeP38t25QMvWDJECSQGW_mTfouLdO6A0r7lj5KEpRk"}) 
 }
 

@Injectable({
  providedIn: 'root'
})
export class PlanesService {



  public notificacion = new EventEmitter<any>();
  private opcionesUrl =  environment.base_url + '/planes';  // URL to web api
  private opcionesUrl2 =  environment.base_url + '/usuarios/plan';  // URL to web api
  private opcionesUrl3 =  environment.base_url + '/planes/pago';  // URL to web api

  private Url = "https://pay.payphonetodoesposible.com/api/button/Prepare"
  private UrlPago = " https://pay.payphonetodoesposible.com/api/button/V2/Confirm"
  constructor(private http: HttpClient) { }




  addPlan (proveedor: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.opcionesUrl, proveedor, httpOptions);
  }

  addPlanPago (proveedor: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.opcionesUrl3, proveedor, httpOptions);
  }

  getPlan (usuario_id:string): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }

  updateUsuario (proveedor: Usuario): Observable<any> {
    return this.http.put(this.opcionesUrl2, proveedor, httpOptions);
  }

  pagar(data: any): Observable<any> {

    return this.http.post(this.Url, data, httpBearer);
  }

  getPago(data:any): Observable<any>{
  
    return this.http.post(this.UrlPago,data, httpBearer);

  }

}
