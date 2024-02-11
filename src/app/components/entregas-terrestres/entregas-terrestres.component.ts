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
    this.cargarEnviosTerrestres();
  }

  cargarEnviosTerrestres(): void {
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
    this.envioActual = { ...envio };
    this.modoEdicion = true;
  }

  iniciarCreacion(): void {
    this.envioActual = this.inicializarEnvio();
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.envioActual = this.inicializarEnvio();
  }

  guardarEnvio(): void {
    if (this.envioActual.envioTerrestreID) {
      this.entregaTerrestreService.update(this.envioActual.envioTerrestreID, this.envioActual).subscribe(
        () => {
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
    if (confirm('¿Está seguro de que desea eliminar este envío terrestre?')) {
      this.entregaTerrestreService.delete(envioTerrestreID).subscribe(
        () => {
          this.cargarEnviosTerrestres();
        },
        error => {
          console.error('Error al eliminar el envío:', error);
        }
      );
    }
  }

  private inicializarEnvio(): EnvioTerrestre {
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
