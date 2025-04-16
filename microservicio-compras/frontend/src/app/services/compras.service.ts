import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:3002/api/compras'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Métodos para compras
  getCompraById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  createCompra(userId: string, compraData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}`, compraData);
  }

  updateCompra(userId: string, compraId: string, compraData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/compraID/${compraId}`, compraData);
  }

  deleteCompra(userId: string, compraId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/compraID/${compraId}`);
  }

  // Métodos para refrescos
  getAllRefrescos(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/refrescos`);
  }

  getRefrescoById(userId: string, refrescoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarioID/${userId}/refrescoID/${refrescoId}`);
  }

  getRefrescoByNombre(userId: string, nombre: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarioID/${userId}/refrescoNombre/${nombre}`);
  }

  actualizarRefresco(userId: string, refrescoId: string, compraData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarioID/${userId}/refrescoID/${refrescoId}`, compraData);
  }
}