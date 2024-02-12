import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { PuertosComponent } from './components/puertos/puertos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EntregasMaritimasComponent } from './components/entregas-maritimas/entregas-maritimas.component';
import { EntregasTerrestresComponent } from './components/entregas-terrestres/entregas-terrestres.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'bodegas', component: BodegasComponent },
  { path: 'puertos', component: PuertosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'envios-maritimos', component: EntregasMaritimasComponent },
  { path: 'envios-terrestres', component: EntregasTerrestresComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
