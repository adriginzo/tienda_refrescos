import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3001/api/usuarios';  // Asegúrate de cambiar esta URL si es diferente

  constructor(private http: HttpClient) { }

  // Método para obtener los usuarios
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
