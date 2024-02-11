import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component'; // Importa el componente de clientes

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent }, // Ruta para el componente de clientes
  { path: '', redirectTo: '/clientes', pathMatch: 'full' } // Redirige la ruta base a clientes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
