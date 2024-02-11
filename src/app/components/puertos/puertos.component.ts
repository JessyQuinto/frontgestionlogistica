import { Component, OnInit } from '@angular/core';
import { PuertoService } from 'src/app/services/services/puerto.service';
import { Puerto } from '../../models/puerto';

@Component({
  selector: 'app-puertos',
  templateUrl: './puertos.component.html',
})
export class PuertosComponent implements OnInit {
  puertos: Puerto[] = [];
  puertoActual: Puerto = { puertoID: 0, nombre: '', ubicacion: '', capacidad: 0 };
  modoEdicion: boolean = false;

  constructor(private puertoService: PuertoService) { }

  ngOnInit(): void {
    this.cargarPuertos();
  }

  cargarPuertos(): void {
    this.puertoService.getPuertos().subscribe(
      (data: Puerto[]) => {
        this.puertos = data;
      },
      error => {
        console.error('Error al cargar puertos:', error);
      }
    );
  }

  iniciarEdicion(puerto?: Puerto): void {
    if (puerto) {
      this.puertoActual = { ...puerto };
    } else {
      // Inicializa un nuevo puerto con valores predeterminados
      this.puertoActual = { puertoID: 0, nombre: '', ubicacion: '', capacidad: 1 };
    }
    this.modoEdicion = true;
  }
  
  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.puertoActual = { puertoID: 0, nombre: '', ubicacion: '', capacidad: 0 };
  }

  guardarPuerto(): void {
    if (this.modoEdicion) {
      this.puertoService.updatePuerto(this.puertoActual.puertoID, this.puertoActual).subscribe(
        () => {
          this.cargarPuertos();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al actualizar el puerto:', error);
        }
      );
    } else {
      this.puertoService.createPuerto(this.puertoActual).subscribe(
        () => {
          this.cargarPuertos();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al crear el puerto:', error);
        }
      );
    }
  }

  eliminarPuerto(puertoID: number): void {
    if (confirm('¿Está seguro de que desea eliminar este puerto?')) {
      this.puertoService.deletePuerto(puertoID).subscribe(
        () => {
          this.cargarPuertos();
        },
        error => {
          console.error('Error al eliminar el puerto:', error);
        }
      );
    }
  }
}
