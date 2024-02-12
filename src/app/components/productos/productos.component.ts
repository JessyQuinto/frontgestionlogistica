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
    // Carga la lista de productos al iniciar
    this.cargarProductos();
  }

  cargarProductos(): void {
    // Obtiene los productos desde el servidor
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      error => console.error('Error al cargar productos:', error)
    );
  }

  iniciarEdicion(producto?: Producto): void {
    // Prepara el objeto productoActual para edición o creación
    if (producto) {
      this.productoActual = { ...producto };
    } else {
      this.productoActual = this.inicializarProducto();
    }
    this.modoEdicion = true;
  }

  inicializarProducto(): Producto {
    // Retorna un nuevo producto con valores por defecto
    return { productoID: 0, nombre: '', descripcion: '', tipo: '' };
  }

  cancelarEdicion(): void {
    // Restablece el productoActual y sale del modo de edición
    this.modoEdicion = false;
    this.productoActual = this.inicializarProducto();
  }

  guardarProducto(): void {
    // Guarda cambios del productoActual o crea uno nuevo
    if (this.productoActual.productoID) {
      this.productoService.updateProducto(this.productoActual.productoID, this.productoActual).subscribe(
        () => {
          // Producto actualizado correctamente
          this.cargarProductos();
          this.cancelarEdicion();
        },
        error => console.error('Error al actualizar el producto:', error)
      );
    } else {
      this.productoService.createProducto(this.productoActual).subscribe(
        () => {
          // Producto creado correctamente
          this.cargarProductos();
          this.cancelarEdicion();
        },
        error => console.error('Error al crear el producto:', error)
      );
    }
  }

  eliminarProducto(productoID: number): void {
    // Confirma y elimina un producto
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productoService.deleteProducto(productoID).subscribe(
        () => {
          // Producto eliminado correctamente
          this.cargarProductos();
        },
        error => console.error('Error al eliminar el producto:', error)
      );
    }
  }
}
