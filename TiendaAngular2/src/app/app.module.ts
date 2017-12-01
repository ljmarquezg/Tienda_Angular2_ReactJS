import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Inyectar los componentes de formularios
import { HttpModule } from '@angular/http';

import { DatabaseService } from './database.service'; //Incluir el servicio DatabaseServices
import { TiendaDatabaseService } from './tienda-database.service'; //Incluir el servicio TiendaDatabaseServices

import { AppComponent } from './app.component';
import { TiendaRoutingModule } from './app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { TiendaComponent } from './tienda/tienda.component';
import { BarraSuperiorComponent } from './tienda/barra-superior/barra-superior.component';
import { ListaProductosComponent } from './tienda/lista-productos/lista-productos.component';



@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    InicioComponent,
    TiendaComponent,
    ListaProductosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule, //Inyectar el módulo ReactiveForms
    TiendaRoutingModule //Agregar el modulo TareasRouting para el manejo de las URL
  ],
  providers: [TiendaDatabaseService, DatabaseService], //Inyectar los servicios TiendaDatabaseService y DatabaseService dentro de la aplicacion
  bootstrap: [AppComponent]
})
export class AppModule { }
