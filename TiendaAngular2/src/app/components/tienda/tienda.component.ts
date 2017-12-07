import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Importar los componentes ForModule, FormControl y Validator para manejar y validar los formularios
import { CurrencyPipe } from '@angular/common'
import { OnChanges } from '@angular/core';

//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
import { CarritoService} from '../../services/carrito.service';
import { ProductoService} from '../../services/producto.service';
//======================Importar Componentes====================================
import { BarraSuperiorComponent  } from '../barra-superior/barra-superior.component';
//======================Importar Modelos========================================
import { Producto } from '../../models/Producto';
import { ProductoCarrito } from '../../models/ProductoCarrito';
//=====================Importar Pipes===========================================


@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  private formulario : FormGroup; //Definir la variable formulario como un FormGroup
  private listaProductos : Object[]; //Crear un objeto con la lista de productos obtenidos de la base de datos
  public listaCarrito : Producto[] = []; //Crear un arreglo de productos para almacenar los productos guardados en el carrito
  public productoCarrito : ProductoCarrito; //Definir un objeto con las pro

  constructor(private productoService : ProductoService, /*private data : TiendaDatabaseService,*/
              private router : Router,
              private auth : AuthService,
              private carrito : CarritoService
            ) { }


  ngOnInit() {
    if (!this.auth.checkSession()){
      console.log(sessionStorage.getItem("Session"))
      this.router.navigate(['/login'])
    }

    this.formulario = new FormGroup(
      {
        'descripcion' : new FormControl(),
        'imagen': new FormControl(),
        'precio': new FormControl(),
        'disponible': new FormControl(),
      }
    )
    this.mostrarProductos()
  }

  mostrarProductos(){
    this.productoService.getProductos().subscribe(
      ()=>{
        this.listaProductos = this.productoService.catalogo
      }
    )
  }

  agregarProducto(id:number, value:number){
    this.productoService.buscarProducto(id).subscribe(
      (productoEncontrado)=>{
        if(productoEncontrado.disponible < value){
          window.alert('Máxima existencia es: '+ productoEncontrado.disponible);
        }else{
          this.productoCarrito = productoEncontrado
          this.productoCarrito.disponible = value
          this.verificarCarrito(this.productoCarrito);
        }
     }
    )
  }

  verificarCarrito(item){
    if(this.guardarCarrito(item) == false){
          this.listaCarrito.push(item)
    }
    this.carrito.carritoSession(this.listaCarrito);
    console.log(this.listaCarrito.length)
  }

  guardarCarrito(item){
    if(this.listaCarrito.length > 0){
      for(let itemGuardado of this.listaCarrito){
          if(itemGuardado.id == item.id){
            itemGuardado.disponible = Number(itemGuardado.disponible) + Number(item.disponible)
            return true
        }
      }
      //console.log('Producto no encontrado, Agregando a carrito')
      return false;
    }
    //console.log('Producto no encontrado, Agregando a carrito')
    return false
  }



}
