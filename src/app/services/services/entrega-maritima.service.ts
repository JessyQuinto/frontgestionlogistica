import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvioMaritimo } from 'src/app/models/envio-maritimo';
@Injectable({
  providedIn: 'root'
})
export class EntregaMaritimaService {
  private apiUrl = 'https://localhost:7191/api/EnviosMaritimos';
  
  constructor(private http: HttpClient) { }

  getEnviosMaritimos(): Observable<EnvioMaritimo[]> {
    return this.http.get<EnvioMaritimo[]>(this.apiUrl);
  }

  getEnvioMaritimo(id: number): Observable<EnvioMaritimo> {
    return this.http.get<EnvioMaritimo>(`${this.apiUrl}/${id}`);
  }

  createEnvioMaritimo(envioMaritimo: EnvioMaritimo): Observable<EnvioMaritimo> {
    return this.http.post<EnvioMaritimo>(this.apiUrl, envioMaritimo);
  }

  updateEnvioMaritimo(id: number, envioMaritimo: EnvioMaritimo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, envioMaritimo);
  }

  deleteEnvioMaritimo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
