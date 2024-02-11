// En src/app/components/bodegas/bodegas.component.ts
import { Component, OnInit } from '@angular/core';
import { BodegaService } from 'src/app/services/services/bodega.service';
import { Bodega } from '../../models/bodega'; // Asegúrate de tener este modelo

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',

})
export class BodegasComponent implements OnInit {
  bodegas: Bodega[] = [];

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
        console.log(error);
      }
    );
  }

  // Implementa métodos adicionales para crear, actualizar y eliminar...
}
