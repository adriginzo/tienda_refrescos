import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefrescosService {
  private apiUrl = 'http://localhost:3000/api/refrescos'; // URL del backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los refrescos
  obtenerRefrescos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para borrar un refresco por su ID
  borrarRefresco(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // URL para borrar un refresco específico
    return this.http.delete(url); // Realiza una solicitud DELETE
  }

  // Método para agregar un nuevo refresco
  agregarRefresco(refresco: any): Observable<any> {
    return this.http.post(this.apiUrl, refresco); // Realiza una solicitud POST
  }

  actualizarRefresco(id: string, datos: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // URL para actualizar un refresco específico
    return this.http.put(url, datos); // Realiza una solicitud PUT
  }

  // Método para buscar un refresco por ID
  buscarRefrescoPorId(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Endpoint para buscar por ID
    return this.http.get<any>(url);
  }

  // Método para buscar un refresco por nombre
  buscarRefrescoPorNombre(nombre: string): Observable<any> {
    const url = `${this.apiUrl}/nombre/${nombre}`;
    return this.http.get<any>(url);
  }
}