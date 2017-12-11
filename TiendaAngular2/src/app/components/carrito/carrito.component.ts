import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'; //Inyectar el componente router para manejar redirecciones URL
import 'rxjs/Rx';
//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
import { CarritoService } from '../../services/carrito.service';
import { TiendaService } from '../../services/tienda.service';
//======================Importar Modelos========================================
import { Producto } from '../../models/Producto';
import { ProductoCarrito } from '../../models/ProductoCarrito';
//==============================================================================

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public listaCarrito : ProductoCarrito[] = []; //Crear un arreglo de productos para almacenar los productos guardados en el carrito
  public catalogo : Producto[] = [];
  public titulo: string;

  constructor(private carritoService : CarritoService,
              private detectChanges:ChangeDetectorRef,
              private tiendaService : TiendaService,
              private auth : AuthService,
              private http : Http, private router : Router
            ) {
    this.titulo = 'Carrito de compras';
   }

  ngOnInit() {
    if (!this.auth.checkSession()){
      console.log(sessionStorage.getItem("Session"))
      this.router.navigate(['/login'])
    }else{
      this.listaCarrito = this.carritoService.itemsCarrito();
    }
  }

  //==============Calcular Totales================================================
    total(){
      let total :number = 0
      let items = this.carritoService.listaCarrito;
      for(let subtotal of items ){
       total += subtotal.cantidad * subtotal.precio;
      }
      return total;
    }
  //=============Pagar Carrito==================================================
  pagarCarrito(){
    this.http.get('https://tienda-angular2.firebaseio.com/productos/.json')
    .map((response : Response) => {
        this.catalogo =  response.json()
      }
    ).subscribe(
      ()=>{
        for (let itemCatalogo of this.catalogo){
          for (let item of this.listaCarrito){
            if ( itemCatalogo.id == item.id ){
              let cantidad = Number(item.cantidad);
              console.log(itemCatalogo)
              console.log("itemCatalogo: "+ typeof(itemCatalogo.disponible)+ " Cantidad " + typeof(cantidad) + " ")
              itemCatalogo.disponible = itemCatalogo.disponible - cantidad
              this.actualizarDisponible(item.id, itemCatalogo).subscribe(
                (response) => {
                  console.log(response)
                  this.vaciarCarrito()
                }
              )
            }
          }
        }
        this.router.navigate(['/tienda'])
      }
    )
  }
  actualizarDisponible(id:number, itemCatalogo:Producto){
    return this.http.put(`https://tienda-angular2.firebaseio.com/productos/${id}.json`, itemCatalogo)
    .map((response : Response) => {
        return this.catalogo =  response.json()
      }
    )
  }
  //============Vaciar los items del carrito====================================
    vaciarCarrito(){
    sessionStorage.setItem('Carrito', '[]')
    this.listaCarrito = [];
    this.carritoService.eliminarCarrito(this.listaCarrito);
    this.carritoService.listaCarrito = [];
    this.detectChanges.detectChanges(); //Actualizar los cambios
    this.tiendaService.getProductos().subscribe() //Cargar de nuevo los productos
    }
  //================Eliminar Productos Carrito==================================
    eliminarProducto(id:number, value:number){
      for(let item of this.listaCarrito){
        if(item.id == id){
          let index = this.listaCarrito.indexOf(item);
          if(value == null){
            this.listaCarrito.splice(index, 1);
            this.carritoService.eliminarCarrito(this.listaCarrito);
            this.total();
            this.tiendaService.actualizarDisponible(id, Number(item.cantidad), true);
          }else{
            if(value > 0){
               //Verificar que la cantidad indicada no sea mayor a la existente en el carrito
              let validar = (Number(item.cantidad) - value);
              if(validar < 0){
                window.alert('La cantidad indicada excede a la cantidad en el carrito.');
              }else{
                item.cantidad = validar;
                if (item.cantidad == 0) {
                  //Si se eliminan las cantidades existentes en el carrito, eliminar el producto
                  this.listaCarrito.splice(index, 1);
                }
                //Asignar la nueva existencia al carrito
                this.carritoService.eliminarCarrito(this.listaCarrito);
                this.tiendaService.actualizarDisponible(id, Number(value), true);
              }
            }else{
            window.alert('Debe especificar una cantidad válida');
            }
          }
        }
      }this.detectChanges.detectChanges(); //Actualizar los cambios en la vista
    }
  //==============================================================================
}
