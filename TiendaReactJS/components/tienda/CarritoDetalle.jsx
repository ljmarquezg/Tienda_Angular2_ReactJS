import React from 'react'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'; //Manejo de arrays

class CarritoDetalle extends React.Component {


//===============================================================================
//                    Constructor
//------------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = { //Inicializar variables
      inputValue : 0,
      subtotal: 0,
      cantidad : 0,
      listaProductos: []
    };
  }
//==============================================================================
//                    Component Will Mount
//------------------------------------------------------------------------------
  componentWillMount(){
    this.subtotal(this.props.precio, this.props.cantidad)
    this.setState({cantidad:this.props.cantidad})
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
              <Link to={`/producto/${this.props.id}`}>
                <img src={this.props.imagen}/>
              </Link>
             </div>
             <div className="card-stacked">
            <div className="card-content">
              <div className="informacion blue-grey-text text-darken-2">
                <p className="card-title">{this.props.descripcion}</p>
                <p><b>Precio: </b>{this.props.precio}</p>
                <p><b>Cantidad: </b>{this.state.cantidad ? this.state.cantidad : 'Agotado'}</p>
                <div className="input-group" >
                  <div className="file-field input-field">
                      <button  onClick={this.eliminarProducto.bind(this)} className="btn orange darken-4 input waves-effect waves-light" type="button" disabled={ (this.state.cantidad <= 0) ? true : false } > <i className="material-icons">delete</i></button>
                    <div className="file-path-wrapper">
                      <input type="number" value={this.state.inputValue} disabled={ (this.state.cantidad <= 0 ) ? true : false } min="0" max={this.state.cantidad} className="form-control right-align" onChange={evt => this.updateInputValue(evt)}></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="card-action">
              <div className="list-group-item footer">
                <div className="no-padding col-xs-6 text-right">
                  <h5><b>Subtotal: </b></h5>
                </div>
                <div className="no-padding col-xs-6 text-right">
                  <h5>{this.state.subtotal}</h5>
                </div>
              </div>
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

    eliminarProducto(borrar:boolean = false){
      let cantidad = (Number(this.state.cantidad) - Number(this.state.inputValue))
      let listaProductos = this.state.listaProductos

      if(cantidad < 0){
        alert('Verifique la cantidad a eliminar')
        return
      }
      this.setState({cantidad : cantidad})
      this.subtotal(this.props.precio, cantidad)
      for (let item of listaProductos){
        if (item.id == this.props.id){
          item.cantidad = cantidad
          if (cantidad == 0 || borrar == true){
            let index = listaProductos.indexOf(item); //Verificar la posición del producto actual en el arreglo de productos almacenados en el carrito
            listaProductos.splice(index, 1); //Eliminar el objeto Producto en la posición actual del item en el arreglo de objetos
            //this.total(); //Actualizar los totales en la vista carrito
            //this.tiendaService.actualizarDisponible(id, Number(item.cantidad), true); //Ejecutar la función actualizar disponibles enviando como parámetros el id del producto, la cantidad y especificar que devolver el item es verdadero
          }
          this.setState({listaProductos : listaProductos})
          this.props.actualizarCarrito(this.state.listaProductos)
        }
      }
    }
  }
export default CarritoDetalle
