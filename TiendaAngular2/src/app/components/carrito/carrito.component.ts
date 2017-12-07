import { Component, OnInit } from '@angular/core';
//======================Importar Servicios======================================
import { CarritoService } from '../../services/carrito.service';
//======================Importar Modelos========================================
import { ProductoCarrito } from '../../models/ProductoCarrito';
//==============================================================================

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public listaCarrito : ProductoCarrito[] = []; //Crear un arreglo de productos para almacenar los productos guardados en el carrito
  public titulo: string;

  constructor(private carritoService : CarritoService) {
    this.titulo = 'Carrito de compras';
   }

  ngOnInit() {
      this.listaCarrito = this.carritoService.itemsCarrito()
  }

  //==============Calcular Totales================================================
    total(){
      let total :number = 0
      let items = this.carritoService.listaCarrito
      for(let subtotal of items ){
       total += subtotal.disponible * subtotal.precio;
      }
      return total;
    }

}
