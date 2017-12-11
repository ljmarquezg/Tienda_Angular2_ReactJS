import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Importar los componentes ForModule, FormControl y Validator para manejar y validar los formularios
import { CurrencyPipe } from '@angular/common'
import { OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
import { CarritoService} from '../../services/carrito.service';
import { TiendaService} from '../../services/tienda.service';
//======================Importar Modelos========================================
import { ProductoCarrito } from '../../models/ProductoCarrito';
import { Producto } from '../../models/Producto';
//=====================Importar Pipes===========================================
@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],

})
export class TiendaComponent implements OnInit {

  private formulario : FormGroup; //Definir la variable formulario como un FormGroup
  private listaProductos : Producto[]; //Crear un objeto con la lista de tiendas obtenidos de la base de datos
  public productoCarrito : ProductoCarrito; //Definir un objeto con las pro
  private titulo : string;
  public session : string;

  constructor(private tiendaService : TiendaService,
              private router : Router,
              private auth : AuthService,
              private detectChanges:ChangeDetectorRef,
              private carritoService : CarritoService
            ) { this.titulo = 'Catálogo de Productos'}


  ngOnInit() {
    if (!this.auth.checkSession()){
      console.log(sessionStorage.getItem("Session"))
      this.router.navigate(['/login'])
    }else{
    this.session = sessionStorage.getItem("Carrito")
      this.formulario = new FormGroup(
        {
          'descripcion' : new FormControl(),
          'imagen': new FormControl(),
          'precio': new FormControl(),
          'cantidad': new FormControl(),
        }
      )
      this.mostrarProductos()
    }
  }

//================Cargar Productos==============================================
  mostrarProductos(){
  //Verificar si existe información del catálogo
    if(!this.tiendaService.productosCatalogo){
      this.tiendaService.getProductos().subscribe(
        ()=>{
          this.listaProductos = this.tiendaService.catalogo;
          this.checkCarrito();
        }
      )
    }else{
          this.listaProductos = this.tiendaService.productosCatalogo;
    }
  }
//================Agregar Productos=============================================
  agregarProducto(id:number, value:number){
    for (let item of this.tiendaService.productosCatalogo){
      if(item.id == id){
        if(item.disponible < value){
          window.alert('Máxima existencia es: '+ item.disponible);
        }else{
          let cantidadActual = item.disponible;
          //Convertir el objeto de la tienda en objeto carrito
          this.productoCarrito = {
            "id": item.id,
            "descripcion": item.descripcion,
            "imagen": item.imagen,
            "precio": item.precio,
            "cantidad": value
          }
          this.carritoService.verificarCarrito(this.productoCarrito);
          //Actualizar el valor del producto en el catalogo
          item.disponible = cantidadActual - value;
        }
      }
    }
  }
  //================Filtrar Productos============================================
    filtrarCatalogo(filtro){
      this.listaProductos = this.tiendaService.filtrarProducto(filtro);
    }
  //================Actualizar Disponibles============================================
    checkCarrito(){
      for(let itemCarrito of this.carritoService.listaCarrito){
        this.tiendaService.actualizarDisponible(itemCarrito.id, itemCarrito.cantidad)
      }
    }
  //================Obtener Cantidad De Productos En Carrito======================
  obtenerCantidad(id:number){
    for(let item of this.carritoService.listaCarrito){
      if(item.id == id){
        return item.cantidad
      }
    }
    return null
  }
  //==============================================================================
}
