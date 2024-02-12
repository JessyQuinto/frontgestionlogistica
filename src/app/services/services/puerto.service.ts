
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puerto } from 'src/app/models/puerto';

@Injectable({
  providedIn: 'root'
})
export class PuertoService {
  private apiUrl = 'https://localhost:7191/api/Puertos'; 

  constructor(private http: HttpClient) { }

  getPuertos(): Observable<Puerto[]> {
    return this.http.get<Puerto[]>(this.apiUrl);
  }

  getPuertoById(puertoId: number): Observable<Puerto> {
    return this.http.get<Puerto>(`${this.apiUrl}/${puertoId}`);
  }

  createPuerto(puerto: Puerto): Observable<Puerto> {
    return this.http.post<Puerto>(this.apiUrl, puerto);
  }

  updatePuerto(puertoId: number, puerto: Puerto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${puertoId}`, puerto);
  }

  deletePuerto(puertoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${puertoId}`);
  }
}
