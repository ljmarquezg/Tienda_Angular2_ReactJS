import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Importar los componentes ForModule, FormControl y Validator para manejar y validar los formularios
import { TiendaDatabaseService } from '../tienda-database.service'; //Importar TiendaDatabaseService para realiar la consulta a la base de datos
import { Usuario } from '../Usuario';

@Component({
  selector: 'inicio', //identificador del componentes
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  error:string; //definir la variable error de tipo srting
  formulario : FormGroup; //Definir la variable formulario como un FormGroup
  usuario : Usuario[];
  constructor( private data : TiendaDatabaseService) { }

  ngOnInit() { //inicializar
    this.data.getDatos();
    this.formulario = new FormGroup(
      {
        'email' : new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      }
    )
  }

  onSubmit(){
    let loginUser = new Usuario; //Crear un objeto con las propiedades de Usuario
    if(this.formulario.valid){ //Si el formulario se envía correctamente
      loginUser.email = this.formulario.value.email; //Asignar el valor email del formulario al valor email del objeto Usuario
      loginUser.password = this.formulario.value.password; //Asignar el valor password del formulario al valor password del objeto Usuario
      this.error = this.data.compararUsuarios(loginUser); //Ejecutar la función compararUsuarios dentro del componente TiendaDatabaseService
    }
  }
}
