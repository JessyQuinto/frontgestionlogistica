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
    this.cargarBodegas();
  }

  cargarBodegas(): void {
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
    return {
      bodegaID: 0,
      nombre: '',
      ubicacion: '',
      capacidad: 0
    };
  }

  iniciarEdicion(bodega: Bodega): void {
    this.bodegaActual = { ...bodega };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.bodegaActual = this.nuevaBodega();
  }

  guardarBodega(): void {
    if (this.bodegaActual.bodegaID) {
      this.bodegaService.updateBodega(this.bodegaActual.bodegaID, this.bodegaActual).subscribe(
        () => {
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
    if (confirm('¿Está seguro de que desea eliminar esta bodega?')) {
      this.bodegaService.deleteBodega(bodegaID).subscribe(
        () => {
          this.cargarBodegas();
        },
        error => {
          console.error('Error al eliminar la bodega:', error);
        }
      );
    }
  }
}
