import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/services/cliente.service';
import { Cliente } from '../../models/cliente'; // Verifica también esta ruta

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
    this.cargarClientes();
  }

  cargarClientes(): void {
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
    this.clienteActual = { clienteID: 0, nombre: '', direccion: '', telefono: '', email: '' };
    this.modoEdicion = true;
  }

  iniciarEdicion(cliente: Cliente): void {
    this.clienteActual = { ...cliente };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.clienteActual = { clienteID: 0, nombre: '', direccion: '', telefono: '', email: '' };
  }

  guardarCliente(): void {
    if (this.clienteActual.clienteID) {
      this.clienteService.updateCliente(this.clienteActual.clienteID, this.clienteActual).subscribe(
        () => {
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
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.clienteService.deleteCliente(clienteID).subscribe(
        () => {
          this.cargarClientes();
        },
        error => {
          console.error('Error al eliminar el cliente:', error);
        }
      );
    }
  }
}
