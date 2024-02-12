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
    // Inicialización y carga de envíos marítimos
    this.cargarEnviosMaritimos();
  }

  cargarEnviosMaritimos(): void {
    // Obtener lista de envíos marítimos desde el servicio
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
    // Configura el envío marítimo actual para edición
    this.envioMaritimoActual = { ...envioMaritimo };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    // Cancela la edición y resetea el envío marítimo actual
    this.modoEdicion = false;
    this.envioMaritimoActual = this.resetEnvioMaritimo();
  }

  guardarEnvioMaritimo(): void {
    // Guarda o actualiza el envío marítimo actual
    if (this.envioMaritimoActual.envioMaritimoID) {
      this.entregaMaritimaService.updateEnvioMaritimo(this.envioMaritimoActual.envioMaritimoID, this.envioMaritimoActual).subscribe(
        () => {
          // Envío marítimo actualizado
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
          // Nuevo envío marítimo creado
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
    // Confirma y elimina un envío marítimo
    if (confirm('¿Estás seguro de que quieres eliminar este envío marítimo?')) {
      this.entregaMaritimaService.deleteEnvioMaritimo(id).subscribe(
        () => {
          // Envío marítimo eliminado
          this.cargarEnviosMaritimos();
        },
        error => {
          console.error('Error al eliminar el envío marítimo:', error);
        }
      );
    }
  }

  resetEnvioMaritimo(): EnvioMaritimo {
    // Reinicia los valores del envío marítimo a valores por defecto
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
