import { Component, OnInit } from '@angular/core';
import { EntregaMaritimaService } from 'src/app/services/services/entrega-maritima.service.spec';
import { EnvioMaritimo } from 'src/app/models/envio-maritimo';

@Component({
  selector: 'app-entregas-maritimas',
  templateUrl: './entregas-maritimas.component.html',

})
export class EntregasMaritimasComponent implements OnInit {
  enviosMaritimos: EnvioMaritimo[] = [];

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
        console.log(error);
      }
    );
  }

  // Aquí puedes añadir métodos para crear, actualizar y eliminar envíos marítimos
}