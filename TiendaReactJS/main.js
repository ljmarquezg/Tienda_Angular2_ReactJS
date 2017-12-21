import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
//import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute, Link } from 'react-router-dom'
import {IntlProvider, FormattedMessage} from 'react-intl';
//=================Importar Componentes======================
//import App from './App.jsx';
import LoginForm from './components/Login.jsx';
import App from './components/App.jsx';
import Tienda from './components/tienda/Tienda.jsx';
import Carrito from './components/tienda/Carrito.jsx';
import Producto from './components/tienda/Producto.jsx'
//import BarraNavegacion from './components/tienda/BarraNavegacion.jsx';
//import LoginFirebase from './components/Login.jsx';

ReactDOM.render(
<IntlProvider locale="en">
  <Router>
    <div>
      <Route exact path="/" component={LoginForm}/>
      <Route path="/tienda" component={()=><App locales={['en-US']} />}/>
    </div>
  </Router>
</IntlProvider>


  , document.getElementById('app')
)

//ReactDOM.render(<BarraNavegacion />, document.getElementById('barra-navegacion'))
//ReactDOM.render(<Tienda />, document.getElementById('tienda'))
//ReactDOM.render(<Firebase />, document.getElementById('firebase'))
//ReactDOM.render(<Login />, document.getElementById('login'))
