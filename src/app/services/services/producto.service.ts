
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://localhost:7191/api/Productos'; 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProducto(productoId: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${productoId}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(productoId: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productoId}`, producto);
  }

  deleteProducto(productoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productoId}`);
  }
}
