import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:3002/api/compras';

  constructor(private http: HttpClient) { }

  getCompras(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getComprasById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}