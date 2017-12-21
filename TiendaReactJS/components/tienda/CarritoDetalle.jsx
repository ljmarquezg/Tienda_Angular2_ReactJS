import React from 'react'
import { Link } from 'react-router-dom'
//import update from 'immutability-helper'; //Manejo de arrays
import { FormattedMessage } from 'react-intl';

class CarritoDetalle extends React.Component {


  //===============================================================================
  //                    Constructor
  //------------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = { //Inicializar variables
      inputValue : 0,
      subtotal: 0,
      listaProductos: [],
      productoCarrito : {
        id : '',
        descripcion : '',
        imagen : '',
        cantidad : '',
      },
    };
  }
  //==============================================================================
  //                    Component Will Mount
  //------------------------------------------------------------------------------
  componentWillMount(){
    this.subtotal(this.props.precio, this.props.cantidad)
    this.setState({listaProductos : JSON.parse(sessionStorage.getItem('Carrito'))})
  }
  //==============================================================================
  //                    Render
  //------------------------------------------------------------------------------
  render() {
    return (
      <div className="col s12 animated fadeIn fast">
      <div className="card horizontal">
      <div className="card-image">
      <Link to={`/tienda/producto/${this.props.id}`}>
      <img src={this.props.imagen}/>
      </Link>
      </div>
      <div className="card-stacked">
      <button onClick={() => this.actualizarDisponible(true)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete</i></button>
      <div className="card-content">
      <div className="informacion blue-grey-text text-darken-2">
      <p className="card-title">{this.props.descripcion}</p>
      <p><b>Precio: </b><FormattedMessage   id="precio"  defaultMessage={`$ {precio, number}`} values={{precio : this.props.precio}}  /></p>
      <p><b>Cantidad: </b>{this.props.cantidad ? this.props.cantidad : 'Agotado'}</p>
      <div className="input-group" >
      <div className="file-field input-field">
      <button  onClick={this.actualizarDisponible.bind(this)} className="btn orange darken-4 input waves-effect waves-light" type="button" disabled={ (this.props.cantidad <= 0) ? true : false } > <i className="material-icons">delete</i></button>
      <div className="file-path-wrapper">
      <input type="number" value={this.state.inputValue} disabled={ (this.props.cantidad <= 0 ) ? true : false } min="0" max={this.props.cantidad} className="form-control right-align" onChange={evt => this.updateInputValue(evt)}></input>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="card-action z-depth-2">
      <div className="no-padding col s12 right-align">
      <h5 className="animated pulse fast" ><b>Subtotal: </b> <FormattedMessage   id="subtotal"  defaultMessage={`$ {subtotal, number}`} values={{subtotal : this.state.subtotal}}  /></h5>
      </div>
      </div>
      </div>
    )
  }

  //======================EventListener para campo de busqueda====================
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  //==============================================================================

  subtotal(precio, cantidad){
    let subtotal = Number(cantidad) * Number(precio); //Crear una variable con el producto de la cantidad y el precio enviados como parámetros en formato Number
    this.setState({subtotal : subtotal}) //Devolver el valor del arreglo
  }

  actualizarDisponible(remover:Boolean = false){
    let cantidad = (Number(this.props.cantidad) - Number(this.state.inputValue))
    if(cantidad < 0 || this.state.inputValue < 0){
      alert('Verifique la cantidad a eliminar')
      return
    }
    this.state.productoCarrito.id =  this.props.id;
    this.state.productoCarrito.descripcion =  this.props.descripcion;
    this.state.productoCarrito.imagen =  this.props.imagen;
    this.state.productoCarrito.precio =  this.props.precio;
    this.state.productoCarrito.cantidad = cantidad;

    this.props.actualizarDisponible(this.state.productoCarrito, cantidad, remover)
    this.subtotal(this.props.precio, cantidad)
    this.setState({productoCarrito : JSON.parse(sessionStorage.getItem("Carrito"))})
    console.log(JSON.parse(sessionStorage.getItem("Carrito")))
  }


  eliminarProducto(borrar:boolean = false){
    let listaProductos = this.state.listaProductos
    this.setState({cantidad : cantidad})
    this.subtotal(this.props.precio, cantidad)
    for (let item of listaProductos){
      if (item.id == this.props.id){
        if (cantidad == 0 || borrar == true){
          //let index = listaProductos.indexOf(item); //Verificar la posición del producto actual en el arreglo de productos almacenados en el carrito
          //let newArray = listaProductos.splice(index, 1); //Eliminar el objeto Producto en la posición actual del item en el arreglo de objetos
          //this.setState({listaProductos : this.removerItem()})
          this.actualizarCarrito(1)
          //console.log(this.state.listaProductos)
          return
        }
        item.cantidad = cantidad
        //this.setState({listaProductos : listaProductos})  //Actualizar la lista de productos
        this.props.actualizarCarrito(listaProductos) //Enviar el nuvo arreglo de productos como parámetro a actualizar en los items del carrito
      }
    }
  }
  //-----------------Actualizar Carrito---------------------------------------------
  actualizarCarrito(listado){
    this.contador()
    this.setState({cantidad1 : this.state.contador * 2})
    this.props.actualizarCarrito(0)
  }

  removerItem(item){
    const index = this.state.listaProductos.indexOf(item);
    if (index < 0 ) return
    this.state.listaProductos.splice(index, 1)
    this.setState({listaProductos: this.state.listaProductos})
  }
    
  componentDidMount(){
    //console.log('subtotal: '+this.state.subtotal)
  }
}


export default CarritoDetalle
