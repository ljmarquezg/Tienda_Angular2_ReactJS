import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  //mostrarContador : boolean;

  constructor() {
  //this.mostrarContador = true;
 }

  ngOnInit() {
  }


  guardarCarrito(id){
    window.alert('Guardando producto ' + id)
  }

}
