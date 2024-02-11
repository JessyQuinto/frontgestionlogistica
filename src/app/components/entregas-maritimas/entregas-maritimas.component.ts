import { Component, OnInit } from '@angular/core';
import { EntregaMaritimaService } from 'src/app/services/services/entrega-maritima.service.spec';
import { EnvioMaritimo } from 'src/app/models/envio-maritimo';

@Component({
  selector: 'app-entregas-maritimas',
  templateUrl: './entregas-maritimas.component.html',
  styleUrls: ['./entregas-maritimas.component.scss']
})
export class EntregasMaritimasComponent implements OnInit {
  enviosMaritimos: EnvioMaritimo[] = [];
  envioMaritimoActual: EnvioMaritimo = this.resetEnvioMaritimo();
  modoEdicion: boolean = false;

  constructor(private entregaMaritimaService: EntregaMaritimaService) { }

  ngOnInit() {
    this.cargarEnviosMaritimos();
  }

  cargarEnviosMaritimos(): void {
    this.entregaMaritimaService.getEnviosMaritimos().subscribe(
      (enviosMaritimos) => {
        this.enviosMaritimos = enviosMaritimos;
      },
      (error) => {
        console.error('Error al cargar los envíos marítimos:', error);
      }
    );
  }

  seleccionarEnvioMaritimo(envioMaritimo: EnvioMaritimo): void {
    this.envioMaritimoActual = { ...envioMaritimo };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.envioMaritimoActual = this.resetEnvioMaritimo();
  }

  guardarEnvioMaritimo(): void {
    if (this.envioMaritimoActual.envioMaritimoID) {
      this.entregaMaritimaService.updateEnvioMaritimo(this.envioMaritimoActual.envioMaritimoID, this.envioMaritimoActual).subscribe(
        () => {
          this.cargarEnviosMaritimos();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al actualizar el envío marítimo:', error);
        }
      );
    } else {
      this.entregaMaritimaService.createEnvioMaritimo(this.envioMaritimoActual).subscribe(
        () => {
          this.cargarEnviosMaritimos();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al crear el envío marítimo:', error);
        }
      );
    }
  }

  eliminarEnvioMaritimo(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este envío marítimo?')) {
      this.entregaMaritimaService.deleteEnvioMaritimo(id).subscribe(
        () => {
          this.cargarEnviosMaritimos();
        },
        error => {
          console.error('Error al eliminar el envío marítimo:', error);
        }
      );
    }
  }

  resetEnvioMaritimo(): EnvioMaritimo {
    return {
      envioMaritimoID: 0,
      clienteID: 0,
      productoID: 0,
      cantidadProducto: 0,
      fechaRegistro: new Date(),
      fechaEntrega: new Date(),
      puertoID: 0,
      precioEnvio: 0,
      numeroFlota: '',
      numeroGuia: '',
    };
  }
}
