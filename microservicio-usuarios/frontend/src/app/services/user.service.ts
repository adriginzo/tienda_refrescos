import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/usuarios';

  constructor(private http: HttpClient) { }

  obtenerUsuarios(userId: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  obtenerUsuariosById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarioID/${userId}`);
  }

  createUsuarios(userData: { role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, userData);
  }

  deleteUsuarios(userId: string, Id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/ID/${Id}`);
  }

  deleteUsuariosActual(IdActual: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${IdActual}`);
  }
}