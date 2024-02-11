// src/app/components/puertos/puertos.component.ts
import { Component, OnInit } from '@angular/core';
import { PuertoService } from 'src/app/services/services/puerto.service';
import { Puerto } from '../../models/puerto';

@Component({
  selector: 'app-puertos',
  templateUrl: './puertos.component.html',

})
export class PuertosComponent implements OnInit {
  puertos: Puerto[] = [];

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
        console.log(error);
      }
    );
  }

  // Puedes añadir aquí más métodos para crear, actualizar y eliminar puertos
}
