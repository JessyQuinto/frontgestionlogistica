import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteActual: Cliente = { clienteID: 0, nombre: '', direccion: '', telefono: '', email: '' };
  modoEdicion: boolean = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    // Inicializa la carga de clientes
    this.cargarClientes();
  }

  cargarClientes(): void {
    // Obtiene todos los clientes desde el servidor
    this.clienteService.getClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
      },
      error => {
        console.error('Error al cargar clientes:', error);
      }
    );
  }

  iniciarCreacion(): void {
    // Prepara un nuevo cliente para ser creado
    this.clienteActual = { clienteID: 0, nombre: '', direccion: '', telefono: '', email: '' };
    this.modoEdicion = true;
  }

  iniciarEdicion(cliente: Cliente): void {
    // Carga el cliente seleccionado para edición
    this.clienteActual = { ...cliente };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    // Cancela la creación o edición de un cliente
    this.modoEdicion = false;
    this.clienteActual = { clienteID: 0, nombre: '', direccion: '', telefono: '', email: '' };
  }

  guardarCliente(): void {
    // Guarda los cambios del cliente o crea uno nuevo
    if (this.clienteActual.clienteID) {
      this.clienteService.updateCliente(this.clienteActual.clienteID, this.clienteActual).subscribe(
        () => {
          // Cliente actualizado con éxito
          this.cargarClientes();
          this.modoEdicion = false;
        },
        error => {
          console.error('Error al actualizar el cliente:', error);
        }
      );
    } else {
      this.clienteService.createCliente(this.clienteActual).subscribe(
        nuevoCliente => {
          // Cliente creado con éxito
          this.clientes.push(nuevoCliente);
          this.cargarClientes();
          this.modoEdicion = false;
        },
        error => {
          console.error('Error al crear el cliente:', error);
        }
      );
    }
  }

  eliminarCliente(clienteID: number): void {
    // Confirma y elimina el cliente
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.clienteService.deleteCliente(clienteID).subscribe(
        () => {
          // Cliente eliminado con éxito
          this.cargarClientes();
        },
        error => {
          console.error('Error al eliminar el cliente:', error);
        }
      );
    }
  }
}
