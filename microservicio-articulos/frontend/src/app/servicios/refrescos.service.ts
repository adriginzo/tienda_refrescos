import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefrescosService {
  private apiUrl = 'http://localhost:3000/api/refrescos';

  constructor(private http: HttpClient) {}

  // Refrescos
  obtenerRefrescos(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarioID/${userId}`);
  }

  borrarRefresco(userId: string, refrescoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarioID/${userId}/refrescoID/${refrescoId}`);
  }

  agregarRefresco(userId: string, refresco: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarioID/${userId}`, refresco); // Cambio importante aquí
  }

  actualizarRefresco(userId: string, refrescoId: string, refrescoActualizado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarioID/${userId}/refrescoID/${refrescoId}`, refrescoActualizado);
  }

  buscarRefrescoPorId(userId: string, refrescoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarioID/${userId}/refrescoID/${refrescoId}`);
  }

  buscarRefrescoPorNombre(userId: string, nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarioID/${userId}/nombre/${nombre}`);
  }

  // Usuarios (¿Deberían estar en un servicio separado?)
  verificarUsuario(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/microservicioU/usuariosID/${userId}`); // Cambiado a ruta más limpia
  }

  obtenerRoleUsuario(userId: string, Id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/microservicioU/${userId}/role/${Id}`); // Cambiado a ruta más limpia
  }
}