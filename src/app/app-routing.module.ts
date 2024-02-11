// Importación de módulos y componentes necesarios
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { PuertosComponent } from './components/puertos/puertos.component'; // Asegúrate de que la ruta de importación sea correcta

// Definición de las rutas
const routes: Routes = [
  { path: 'clientes', component: ClientesComponent }, // Ruta para el componente de clientes
  { path: 'bodegas', component: BodegasComponent }, // Ruta para el componente de bodegas
  { path: 'puertos', component: PuertosComponent }, // Ruta para el componente de puertos
  { path: '', redirectTo: '/clientes', pathMatch: 'full' } // Redirección de la ruta base a clientes
];

// Decorador NgModule para importar y exportar RouterModule
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración de las rutas en el módulo
  exports: [RouterModule] // Exportación de RouterModule para uso en otros módulos
})
export class AppRoutingModule { }
