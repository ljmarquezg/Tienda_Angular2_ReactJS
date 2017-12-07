import { Injectable } from '@angular/core';
//======================Importar Servicios======================================
import { ProductoService } from './producto.service';
//======================Importar Componentes====================================
/*import { TiendaComponent } from '../components/tienda/tienda.component'*/;

@Injectable()
export class CarritoService {

  constructor(/*private tienda : TiendaComponent*/) { }

  carritoSession(itemsCarrito){
    sessionStorage.setItem("Carrito", itemsCarrito);
    console.log(sessionStorage.getItem("Carrito"))
  }

  checkCarrito(){
    if(sessionStorage.getItem("Carrito")){
      console.log("El carrito tiene: "+ sessionStorage.getItem("Carrito")+ 'productos')
    }else{
      console.log("Tu carrito está vacio")
    }
    return sessionStorage.getItem("Carrito"); //Verificar si hay una sesión iniciada
  }

  vaciarCarrito(){
    sessionStorage.removeItem('Carrito');
  }

}
