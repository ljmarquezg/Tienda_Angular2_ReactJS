import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'; //Inyectar el componente router para manejar redirecciones URL
//======================Importar Componentes====================================
import { AuthService } from "../../../services/auth.service";
import { TiendaService} from '../../../services/tienda.service';
import { BarraSuperiorComponent  } from '../../barra-superior/barra-superior.component';
//======================Importar Modelos========================================
import { Producto } from '../../../models/Producto';
//==============================================================================

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  informacionProducto : Producto;

  constructor(private tiendaService : TiendaService,
    private router : Router,
    private auth : AuthService,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit() {
      if (!this.auth.checkSession()){
        console.log(sessionStorage.getItem("Session"))
        this.router.navigate(['/login'])
      }else{
        this.detalleProducto()
      }
    }

    detalleProducto(){
      this.activatedRoute.params.subscribe(params => {
        this.tiendaService.getProductos().subscribe(
          () => {
            this.informacionProducto = this.tiendaService.getDetalleProductos(params['id']);
          })
        });
      }
    }
