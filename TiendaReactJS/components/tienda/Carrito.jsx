import React from 'react';
import { Link } from 'react-router-dom'
import BarraNavegacion from './BarraNavegacion.jsx';
import CarritoDetalle from './CarritoDetalle.jsx'

class Carrito extends React.Component{
  //===============================================================================
  //                    Constructor
  //------------------------------------------------------------------------------
  constructor(props) {
    super(props)
    this.state = {
      listaCarrito : [],
      inputValue:0,

    }
    this.vaciarCarrito = this.vaciarCarrito.bind(this)
  }
  //==============================================================================
  //                    Component Will Mount
  //------------------------------------------------------------------------------
  componentWillMount(){
    this.setState({listaCarrito : JSON.parse(sessionStorage.getItem('Carrito')) ? JSON.parse(sessionStorage.getItem('Carrito')) : '[]' })
  }
  //============================================================================
  //                    Render
  //----------------------------------------------------------------------------
  render(){
    if(this.props.contadorCarrito()){
      return(
        <div className="container">
        <BarraNavegacion contador={this.props.contadorCarrito()}/>
        <div className="animated fadeIn slow">
        <div className="box">
        <div className="row col s12 blue darken-1 animated fadeInDown fast">
        <h4 className="col m6 s12 white-text left ">Carrito de compras</h4>
        </div>
        <div className="col m6 s12">
        {
          this.mostrarCarrito()
        }
        </div>
        <div className="col m6 s12">
        <h4 className="col s12 text-right"><button className="btn red darken-4 btn-sm right"  type="button" onClick={this.vaciarCarrito}><i className="material-icons" style={{'lineHeight' : '14px', 'fontSize': '17px', 'position' : 'relative', 'top': '3px'}} >delete</i> Vaciar Carrito</button></h4>
        <h4 className="col s12 text-right"> Total a pagar:</h4>
        <h3 className="col s12 text-right"> {this.total()} </h3>
        <p className="pull-right">
        <button className="btn btn-success " type="button"  ><i className="material-icons">credit_card</i> (click)="pagarCarrito()" Pagar</button>
        </p>
        </div>
        </div>
        </div>
        </div>
      )
    }else{
      return (
        <div className="container">
        <BarraNavegacion contador={this.props.contadorCarrito()}/>
        <div className="animated fadeIn slow">
        <div className="box">
        <p>No se encontro un producto</p>
        </div>
        </div>
        </div>

      )
    }
  }
  //==============================================================================
  //                    Funciones
  //----------------------Mostrar items en carrito=-------------------------------
  mostrarCarrito(){
    return this.state.listaCarrito.map(
      (producto) => { return <CarritoDetalle key={ producto.id } id={producto.id}  nombre={ producto.nombre } imagen={ producto.imagen } descripcion={ producto.descripcion } cantidad={ producto.cantidad } precio ={producto.precio} actualizarDisponible={this.actualizarDisponible} obtenerCantidad={this.obtenerCantidad} actualizarCarrito={this.actualizarCarrito.bind(this)}/> }
    )
  }
  //--------------------Contar items en carrito-------------------------------------
  contadorCarrito(){
    return JSON.parse(sessionStorage.getItem("Carrito")).length //Contar la cantidad de items en el carrito
  }
  //-----------------Actualizar Carrito---------------------------------------------
  actualizarCarrito(listado){
    this.setState({listaCarrito : listado})
    sessionStorage.setItem('Carrito', JSON.stringify(listado))
  }
  //-----------------Vaciar los items del carrito------------------------------------
  vaciarCarrito(){
    this.setState({listaCarrito : []})
    sessionStorage.setItem('Carrito', '[]') //Asignar como parámetro un array vacío en formato string a la sesion Carrito
  }
  //==============Calcular Totales================================================
  total(){
    let total :number = 0 //Inicializar los totales
    let items = this.state.listaCarrito; //Iniciar la variable items con los items actuales en el carrito
    for(let subtotal of items ){ //recorrer los items dentro del carrito
      total += subtotal.cantidad * subtotal.precio; //Realizar el producto entre la cantidad y el precio y agregarlo al valor guardado anteriormente
    }
    return total; //Devolver el valor de la suma total de todos lso subtotales del producto
  }
  /*//=============Pagar Carrito==================================================
  pagarCarrito(){
  this.http.get('https://tienda-angular2.firebaseio.com/productos/.json') //Realizar una consulta a la base de datos
  .map((response : Response) => {
  this.catalogo =  response.json() //Asignar el valor obtenido en la consulta al arreglo de objetos catalogo
}
).subscribe(
()=>{
for (let itemCatalogo of this.catalogo){ //Recorrer el arreglo de productos obtenidos de la base de datos
for (let item of this.listaCarrito){ //Recorrer el arreglo de productos en el carrito
if ( itemCatalogo.id == item.id ){ //Comparar el id del producto del carrito con el id del producto almacenado en la base de datos
let cantidad = Number(item.cantidad); //obtener la cantidad del producto actual en el carrito
itemCatalogo.disponible = itemCatalogo.disponible - cantidad //Restar la disponibilidad del producto en la base de datos con la cantidad actual en el carrito
this.actualizarDisponible(item.id, itemCatalogo).subscribe( //Ejecutar la funcion actualizarDisponibles enviando como parámetros el id y el objeto Producto en la base de datos
(response) => {
this.vaciarCarrito() //Ejecutar la funcion vaciaCarrito
}
)
}
}
}
this.router.navigate(['/tienda']) //Redireccionar a la tienda
}
)
}
actualizarDisponible(id:number, itemCatalogo:Producto){
return this.http.put(`https://tienda-angular2.firebaseio.com/productos/${id}.json`, itemCatalogo) //Ejecutar el método put a la url de la base de datos enviando como parámetro el objeto Producto con su nuevos valores disponibles
.map((response : Response) => {
return this.catalogo =  response.json() //Asignar a la lista de productos actuales el valor actualizado de los productos en la base de datos
}
)
}*/

//================Eliminar Productos Carrito==================================
/*  eliminarProducto(id:number, value:number){ //Obtener el id y valor de la cantidad de unidades del producto a eliminar
for(let item of this.listaCarrito){ //recorrer el arreglo de productos almacenados en el carrito
if(item.id == id){ //Verificar coincidencias entre el id del producto en el arreglo del carrito y el id recibido como parámetro
let index = this.listaCarrito.indexOf(item); //Verificar la posición del producto actual en el arreglo de productos almacenados en el carrito
if(value == null){ //Si no se envían cantidades del producto a eliminar (se elimina el ITEM juto a las cantidades del carrito)
this.listaCarrito.splice(index, 1); //Eliminar el objeto Producto en la posición actual del item en el arreglo de objetos
this.carritoService.eliminarCarrito(this.listaCarrito); //Actualizar la sesión de productos en el carrito
this.total(); //Actualizar los totales en la vista carrito
this.tiendaService.actualizarDisponible(id, Number(item.cantidad), true); //Ejecutar la función actualizar disponibles enviando como parámetros el id del producto, la cantidad y especificar que devolver el item es verdadero
}else{
if(value > 0){ //Si el valor es mayor que 0
//Verificar que la cantidad indicada no sea mayor a la existente en el carrito
let validar = (Number(item.cantidad) - value); //Crear una variable que almacene la resta de la cantidad actual con la cantidad recibida como parámetro a eliminar del carrito
if(validar < 0){ //Si el resultado es menor a 0
window.alert('La cantidad indicada excede a la cantidad en el carrito.'); //Ejecutar mensaje de alerta
}else{
item.cantidad = validar; //Asignar el valor de la resta obtenida en la propiedad cantidad del Objeto actual
if (item.cantidad == 0) { //Verificar que se eliminen todos las unidades existentes en el carrito
//Si se eliminan las cantidades existentes en el carrito, eliminar el producto
this.listaCarrito.splice(index, 1);
}
//Asignar la nueva existencia al carrito
this.carritoService.eliminarCarrito(this.listaCarrito); //Actualizar la información del arreglo de objetos de la sesion Carrito
this.tiendaService.actualizarDisponible(id, Number(value), true); //Ejecutar la función actualizar disponibles enviando como parámetros el id del producto, la cantidad y especificar que devolver el item es verdadero
}
}else{
window.alert('Debe especificar una cantidad válida'); //Mostrar mensaje de alerta si existe algún error
}
}
}
}this.detectChanges.detectChanges(); //Actualizar los cambios en la vista
}*/

}
export default Carrito;
