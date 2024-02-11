import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoActual: Producto = { productoID: 0, nombre: '', descripcion: '', tipo: '' };
  modoEdicion: boolean = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      error => console.error('Error al cargar productos:', error)
    );
  }

  // Método para iniciar la edición o agregar un nuevo producto
  iniciarEdicion(producto?: Producto): void {
    if (producto) {
      this.productoActual = { ...producto };
    } else {
      // Inicializa productoActual con valores predeterminados
      this.productoActual = this.inicializarProducto();
    }
    this.modoEdicion = true;
  }

  // Método para inicializar un objeto Producto con valores predeterminados
  inicializarProducto(): Producto {
    return { productoID: 0, nombre: '', descripcion: '', tipo: '' };
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.productoActual = { productoID: 0, nombre: '', descripcion: '', tipo: '' };
  }

  guardarProducto(): void {
    if (this.modoEdicion) {
      this.productoService.updateProducto(this.productoActual.productoID, this.productoActual).subscribe(
        () => {
          this.cargarProductos();
          this.cancelarEdicion();
        },
        error => console.error('Error al actualizar el producto:', error)
      );
    } else {
      this.productoService.createProducto(this.productoActual).subscribe(
        () => {
          this.cargarProductos();
          this.cancelarEdicion();
        },
        error => console.error('Error al crear el producto:', error)
      );
    }
  }

  eliminarProducto(productoID: number): void {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productoService.deleteProducto(productoID).subscribe(
        () => {
          this.cargarProductos();
        },
        error => console.error('Error al eliminar el producto:', error)
      );
    }
  }
}
