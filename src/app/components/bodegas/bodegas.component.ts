import { Component, OnInit } from '@angular/core';
import { BodegaService } from 'src/app/services/services/bodega.service';
import { Bodega } from '../../models/bodega';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss']
})
export class BodegasComponent implements OnInit {
  bodegas: Bodega[] = [];
  bodegaActual: Bodega = this.nuevaBodega();
  modoEdicion: boolean = false;

  constructor(private bodegaService: BodegaService) { }

  ngOnInit(): void {
    // Carga inicial de bodegas
    this.cargarBodegas();
  }

  cargarBodegas(): void {
    // Solicita la lista de bodegas al servidor
    this.bodegaService.getBodegas().subscribe(
      (data: Bodega[]) => {
        this.bodegas = data;
      },
      error => {
        console.error('Error al cargar bodegas:', error);
      }
    );
  }

  nuevaBodega(): Bodega {
    // Crea una nueva instancia de bodega
    return {
      bodegaID: 0,
      nombre: '',
      ubicacion: '',
      capacidad: 0
    };
  }

  iniciarEdicion(bodega: Bodega): void {
    // Prepara la edición de una bodega
    this.bodegaActual = { ...bodega };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    // Cancela el modo de edición
    this.modoEdicion = false;
    this.bodegaActual = this.nuevaBodega();
  }

  guardarBodega(): void {
    // Guarda los cambios de la bodega en el servidor
    if (this.bodegaActual.bodegaID) {
      this.bodegaService.updateBodega(this.bodegaActual.bodegaID, this.bodegaActual).subscribe(
        () => {
          // Bodega actualizada correctamente
          this.cargarBodegas();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al actualizar la bodega:', error);
        }
      );
    } else {
      this.bodegaService.createBodega(this.bodegaActual).subscribe(
        (nuevaBodega) => {
          // Nueva bodega creada correctamente
          this.bodegas.push(nuevaBodega);
          this.cargarBodegas();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al crear la bodega:', error);
        }
      );
    }
  }

  eliminarBodega(bodegaID: number): void {
    // Confirma y elimina una bodega
    if (confirm('¿Está seguro de que desea eliminar esta bodega?')) {
      this.bodegaService.deleteBodega(bodegaID).subscribe(
        () => {
          // Bodega eliminada correctamente
          this.cargarBodegas();
        },
        error => {
          console.error('Error al eliminar la bodega:', error);
        }
      );
    }
  }
}
