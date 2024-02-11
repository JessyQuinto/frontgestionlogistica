import { Component, OnInit } from '@angular/core';
import { EntregaTerrestreService } from 'src/app/services/services/entrega-terrestre.service';
import { EnvioTerrestre } from 'src/app/models/envio-terrestre';

@Component({
  selector: 'app-entregas-terrestres',
  templateUrl: './entregas-terrestres.component.html',
  styleUrls: ['./entregas-terrestres.component.scss']
})
export class EntregasTerrestresComponent  implements OnInit {
  enviosTerrestres: EnvioTerrestre[] = [];

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
        console.error(error);
      }
    );
  }

  // Implementa métodos para crear, actualizar y eliminar...
}