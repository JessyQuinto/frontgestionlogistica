import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvioTerrestre } from 'src/app/models/envio-terrestre';

@Injectable({
  providedIn: 'root'
})
export class EntregaTerrestreService {
  private apiUrl = 'https://localhost:7191/api/EnviosTerrestres'; // URL

  constructor(private http: HttpClient) { }

  getAll(): Observable<EnvioTerrestre[]> {
    return this.http.get<EnvioTerrestre[]>(this.apiUrl);
  }

  getById(envioTerrestreId: number): Observable<EnvioTerrestre> {
    return this.http.get<EnvioTerrestre>(`${this.apiUrl}/${envioTerrestreId}`);
  }

  create(envioTerrestre: EnvioTerrestre): Observable<EnvioTerrestre> {
    return this.http.post<EnvioTerrestre>(this.apiUrl, envioTerrestre);
  }

  update(envioTerrestreId: number, envioTerrestre: EnvioTerrestre): Observable<any> {
    return this.http.put(`${this.apiUrl}/${envioTerrestreId}`, envioTerrestre);
  }

  delete(envioTerrestreId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${envioTerrestreId}`);
  }
}
