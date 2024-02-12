import { Component, OnInit } from '@angular/core';
import { PuertoService } from 'src/app/services/services/puerto.service';
import { Puerto } from '../../models/puerto';

@Component({
  selector: 'app-puertos',
  templateUrl: './puertos.component.html',
  styleUrls: ['./puertos.component.scss']
})
export class PuertosComponent implements OnInit {
  puertos: Puerto[] = [];
  puertoActual: Puerto = { puertoID: 0, nombre: '', ubicacion: '', capacidad: 0 };
  modoEdicion: boolean = false;

  constructor(private puertoService: PuertoService) { }

  ngOnInit(): void {
    // Inicia la carga de puertos
    this.cargarPuertos();
  }

  cargarPuertos(): void {
    // Obtiene la lista de puertos desde el servidor
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
    // Prepara la edición de un puerto existente o uno nuevo
    this.puertoActual = puerto ? { ...puerto } : { puertoID: 0, nombre: '', ubicacion: '', capacidad: 1 };
    this.modoEdicion = true;
  }
  
  cancelarEdicion(): void {
    // Restablece los valores y sale del modo edición
    this.modoEdicion = false;
    this.puertoActual = { puertoID: 0, nombre: '', ubicacion: '', capacidad: 0 };
  }

  guardarPuerto(): void {
    // Guarda cambios en un puerto existente o crea uno nuevo
    if (this.puertoActual.puertoID) {
      this.puertoService.updatePuerto(this.puertoActual.puertoID, this.puertoActual).subscribe(
        () => {
          // Recarga la lista de puertos tras la actualización
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
          // Recarga la lista de puertos tras la creación de uno nuevo
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
    // Confirma y elimina un puerto
    if (confirm('¿Está seguro de que desea eliminar este puerto?')) {
      this.puertoService.deletePuerto(puertoID).subscribe(
        () => {
          // Actualiza la lista tras eliminar un puerto
          this.cargarPuertos();
        },
        error => {
          console.error('Error al eliminar el puerto:', error);
        }
      );
    }
  }
}
