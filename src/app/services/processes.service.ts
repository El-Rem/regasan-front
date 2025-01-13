import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {
  private apiUrl = `${environment.apiUrl}/tramites`;

  constructor(private http: HttpClient) { }

  // GET: Obtener todos los procesos
  getAllProcesses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET: Obtener proceso por ID o parámetro
  getProcesses(param: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${param}`);
  }

  // GET: Buscar proceso por nombre de la empresa
  searchProcessByBusinessName(businessName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?businessName=${encodeURIComponent(businessName)}`);
  }

  // GET: Buscar proceso por estado
  searchProcessByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status?status=${encodeURIComponent(status)}`);
  }

  // POST: Crear un nuevo proceso
  createProcess(processData: any): Observable<any> {
    return this.http.post(this.apiUrl, processData);
  }

  // PUT: Actualizar un proceso existente por ID
  updateProcess(id: string, processData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, processData);
  }

  // DELETE: Eliminar un proceso por ID
  deleteProcess(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTechnicalData(id: string, technicalData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/datos-tecnicos/${id}`, technicalData);
  }

  getTechnicalDataById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/datos-tecnicos/${id}`);
  }

  confirmVenta(tramiteId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/ventas/${tramiteId}`, {});
  }

  updateFacturacion(tramiteId: string, facturacionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-facturacion/${tramiteId}`, facturacionData);
  }

  getTramitesByRfc(rfc: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tramites-rfc/${rfc}`);
  }

}
