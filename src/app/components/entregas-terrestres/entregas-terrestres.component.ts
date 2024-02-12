import { Component, OnInit } from '@angular/core';
import { EntregaTerrestreService } from 'src/app/services/services/entrega-terrestre.service';
import { EnvioTerrestre } from 'src/app/models/envio-terrestre';

@Component({
  selector: 'app-entregas-terrestres',
  templateUrl: './entregas-terrestres.component.html',
  styleUrls: ['./entregas-terrestres.component.scss']
})
export class EntregasTerrestresComponent implements OnInit {
  enviosTerrestres: EnvioTerrestre[] = [];
  envioActual: EnvioTerrestre = this.inicializarEnvio();
  modoEdicion: boolean = false;

  constructor(private entregaTerrestreService: EntregaTerrestreService) { }

  ngOnInit(): void {
    // Carga los envíos terrestres al iniciar
    this.cargarEnviosTerrestres();
  }

  cargarEnviosTerrestres(): void {
    // Obtiene todos los envíos terrestres disponibles
    this.entregaTerrestreService.getAll().subscribe(
      (data: EnvioTerrestre[]) => {
        this.enviosTerrestres = data;
      },
      error => {
        console.error('Error al cargar los envíos terrestres:', error);
      }
    );
  }

  iniciarEdicion(envio: EnvioTerrestre): void {
    // Establece el envío seleccionado para edición
    this.envioActual = { ...envio };
    this.modoEdicion = true;
  }

  iniciarCreacion(): void {
    // Prepara un nuevo envío para su creación
    this.envioActual = this.inicializarEnvio();
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    // Cancela la edición o creación de un envío
    this.modoEdicion = false;
    this.envioActual = this.inicializarEnvio();
  }

  guardarEnvio(): void {
    // Guarda los cambios o el nuevo envío
    if (this.envioActual.envioTerrestreID) {
      this.entregaTerrestreService.update(this.envioActual.envioTerrestreID, this.envioActual).subscribe(
        () => {
          // Envío actualizado correctamente
          this.cargarEnviosTerrestres();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al actualizar el envío:', error);
        }
      );
    } else {
      this.entregaTerrestreService.create(this.envioActual).subscribe(
        () => {
          // Nuevo envío creado correctamente
          this.cargarEnviosTerrestres();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al crear el envío:', error);
        }
      );
    }
  }

  eliminarEnvio(envioTerrestreID: number): void {
    // Confirma y elimina un envío terrestre
    if (confirm('¿Está seguro de que desea eliminar este envío terrestre?')) {
      this.entregaTerrestreService.delete(envioTerrestreID).subscribe(
        () => {
          // Envío eliminado correctamente
          this.cargarEnviosTerrestres();
        },
        error => {
          console.error('Error al eliminar el envío:', error);
        }
      );
    }
  }

  private inicializarEnvio(): EnvioTerrestre {
    // Crea una nueva instancia de envío terrestre
    return {
      envioTerrestreID: 0,
      clienteID: 0,
      productoID: 0,
      cantidadProducto: 1,
      fechaRegistro: new Date(),
      fechaEntrega: new Date(),
      bodegaID: 0,
      precioEnvio: 0,
      placaVehiculo: '',
      numeroGuia: ''
    };
  }
}
