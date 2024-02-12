import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { PuertosComponent } from './components/puertos/puertos.component';
import { EntregasMaritimasComponent } from './components/entregas-maritimas/entregas-maritimas.component';
import { EntregasTerrestresComponent } from './components/entregas-terrestres/entregas-terrestres.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductosComponent,
    BodegasComponent,
    PuertosComponent,
    EntregasMaritimasComponent,
    EntregasTerrestresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
