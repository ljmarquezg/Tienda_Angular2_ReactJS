import { Component, OnInit , trigger, state, style, transition, animate } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css'],
})
export class BarraSuperiorComponent implements OnInit {
  nuevoItem = 'normal';

  constructor(private auth : AuthService, private carritoService : CarritoService) { }

  ngOnInit() {

  }

  cambiarEstado(){
    this.nuevoItem == 'normal' ? this.nuevoItem = 'agregado' : this.nuevoItem = 'normal';
    console.log('animando')
  }

  cerrarSesion(){
    this.auth.logout();
  }

}
