import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TiendaComponent} from './tienda/tienda.component'
//import { NuevaTareaComponent } from './nueva-tarea/nueva-tarea.component';
//import { VerGrupoComponent } from './ver-grupo/ver-grupo.component';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'tienda', component: TiendaComponent, pathMatch: 'full' },
  //{ path: 'inicio/nueva-tarea', component: NuevaTareaComponent },
  //{ path: 'inicio/ver-grupo/:nombre', component: VerGrupoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class TiendaRoutingModule { }
