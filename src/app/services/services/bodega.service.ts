
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bodega } from 'src/app/models/bodega';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private apiUrl = 'https://localhost:7191/api/Bodegas'; // back

  constructor(private http: HttpClient) { }

  getBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl);
  }

  getBodega(id: number): Observable<Bodega> {
    return this.http.get<Bodega>(`${this.apiUrl}/${id}`);
  }

  createBodega(bodega: Bodega): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, bodega);
  }

  updateBodega(id: number, bodega: Bodega): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bodega);
  }

  deleteBodega(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
