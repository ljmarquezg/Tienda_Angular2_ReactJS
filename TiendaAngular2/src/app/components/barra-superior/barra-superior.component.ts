import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  carritoLleno: string;
  constructor(private auth : AuthService, private carritoService : CarritoService) { }

  ngOnInit() {
    this.carritoLleno = this.carritoService.checkCarrito();
  }

  cerrarSesion(){
    this.auth.logout();
    this.carritoService.vaciarCarrito()
  }

}
