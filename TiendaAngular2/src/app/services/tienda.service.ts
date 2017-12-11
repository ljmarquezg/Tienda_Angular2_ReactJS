import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
//======================Importar Modelos========================================
import { Producto } from '../models/Producto'
//==============================================================================

@Injectable()
export class TiendaService {
  public catalogo : Producto[];
  public productosCatalogo : Producto[];

  constructor(private http : Http, private router : Router) { }
  //================Obtener Productos===========================================
  public getProductos(){
  return this.http.get('https://tienda-angular2.firebaseio.com/productos/.json').map(
    (response : Response) => {
      this.catalogo =  response.json();
      this.productosCatalogo = this.catalogo
    })
  }
  //================Ir a la vista detalle del producto===========================
  public getDetalleProductos(idProduct:number) : Producto {
    for(let item of this.productosCatalogo) {
      if(item.id == idProduct) {
        return item;
      }
    }
    return null;
  }
  //================Verificar si se inicializó el catálogo======================
  cargarCatalogo(){
    return this.productosCatalogo
  }
  //================Filtrar Productos===========================================
  public filtrarProducto(filtro:string){
  this.productosCatalogo = this.catalogo;
  filtro.toLowerCase();
  let itemMatch : Producto[] = [];
  for(let item of this.productosCatalogo){
    let nombre = item.nombre.toLowerCase();
    if(nombre.includes(filtro)){
      itemMatch.push(item)}
    }
    return itemMatch;
  }
  //================Actualizar Disponible=======================================
  actualizarDisponible(id:number, value:number, devolver:boolean = false){
    let catalogo = this.catalogo;
    for(let itemCatalogo of catalogo){
      if (itemCatalogo.id == id){
        if(devolver == false){
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) - value); //Restar la cantidad del carrito en disponibles
        }else{
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) + value); //Sumar la cantidad del carrito en disponibles
      }
        this.productosCatalogo = this.catalogo;
      }
    }
  }
}
