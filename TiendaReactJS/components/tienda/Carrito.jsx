import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
    if(this.contadorCarrito()){
      return(
        <div>
        <BarraNavegacion contador={this.contadorCarrito()}/>
        <div className="animated fadeIn slow">
        <div className="box carrito">
        <div className="row col s12 blue darken-1 animated fadeInDown fast">
        <h5 className="col m6 s12 white-text left ">Carrito de compras</h5>
        </div>
        <div className="col l8 m6 s12">
        {
          this.mostrarCarrito()
        }
        </div>
        <div className="col l4 m6 s12">
        <h5 className="right col s12 right-align"><button className="btn red darken-4 btn-sm"  type="button" onClick={this.vaciarCarrito}><i className="material-icons" style={{'lineHeight' : '14px', 'fontSize': '17px', 'position' : 'relative', 'top': '3px'}} >delete</i> Vaciar Carrito</button></h5>
        <h5 className="right col s12 right-align"> Total a pagar:</h5>
        <h5 className="right col s12 right-align animated pulse fast"> <FormattedMessage   id="total"  defaultMessage={`$ {total, number}`} values={{total : this.total()}}  /></h5>
        <p className="right">
        <button onClick={this.pagarCarrito.bind(this)} className="btn green darken-1" type="button"  ><i className="material-icons">credit_card</i> Pagar</button>
        </p>
        </div>
        </div>
        </div>
        </div>
      )
    }else{
      return (
        <div>
        <BarraNavegacion contador={this.contadorCarrito()}/>
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
      (producto) => { return <CarritoDetalle key={ producto.id } id={producto.id}  descripcion={ producto.descripcion } imagen={ producto.imagen } descripcion={ producto.descripcion } cantidad={ producto.cantidad } precio ={producto.precio} actualizarDisponible={this.actualizarDisponible.bind(this)}/> }
    )
  }
  //==============================================================================
  //                    Verificar items en carrito
  itemsCarrito(){
    if(sessionStorage.getItem("Carrito")){                                    //Verificar si la sesión del carrito contiene información
      this.state.listaCarrito = JSON.parse(sessionStorage.getItem("Carrito")); //Actualizar la información del carrito con la sesión actual en formato JSON
      return JSON.parse(sessionStorage.getItem("Carrito"));                    //Devolver los items del carrito en formato JSON
    }
    return 0;                                                                  //Devolver 0 si no existen carritos
  }
  //--------------------Contador de items en menu---------------------------------
  contadorCarrito(){
    return this.itemsCarrito().length //Contar la cantidad de items en el carrito
  }
  //=============================================================================
  //             Guardar Items en el carrito
  //--------------Actualizar Disponible------------------------------------------
  actualizarDisponible(item:Object, cantidad:Number, remover:Boolean = false){
    for (let productoLista of this.state.listaCarrito){
      if (productoLista.id == item.id){
        productoLista.cantidad = cantidad
        if(productoLista.cantidad == 0 || remover == true){
          this.removerItem(item)
        }
      }
    }
    sessionStorage.setItem("Carrito", JSON.stringify(this.state.listaCarrito))
    this.setState({listaCarrito : this.state.listaCarrito})
  }

  removerItem(item){
    let index = this.state.listaCarrito.findIndex(producto => producto.id === item.id)
    let newArray =   this.state.listaCarrito.splice(index, 1)
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
  //=============Pagar Carrito==================================================
  pagarCarrito(){
    console.log('pagando: '+this.state.total)
  }
}
export default Carrito;
