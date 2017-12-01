import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router'; //Inyectar el componente router para manejar redirecciones URL
import { Response } from '@angular/http';
import { Usuario } from './Usuario';

@Injectable()
export class TiendaDatabaseService {
  errorMostrado = true;
  error:string; //definir la variable error de tipo string
  listaUsuarios : Usuario[];

  constructor( private database : DatabaseService, private router: Router) {

  }

  getDatos(){
    this.database.getUsuarios()
    .subscribe(
      (data)=>{console.log(data), this.listaUsuarios = data }
    )
  }

  compararUsuarios(loginUser){
    let match = false; //Inicializar vaiable comparativa con valor falso
    this.listaUsuarios.forEach(element => { //Recorrer el array de objetos devueltos por el servidor
      if(match === false ){ //Verificar que el valor sea falso
        if(element.email == loginUser.email){ //Verificar el email del objeto actual con el email enviado desde el formulario
          if(element.password == loginUser.password){ //Verificar que la Contraseña del objeto actual corresponda a la enviada desde el formulario
            match = true //Coincidencia encontrada
          }
        }
        this.error = "Error al iniciar sesión"; //Agregar el mensaje de error.
      }else{
        this.redirect('tienda'); //invocar la función redireccionar con el la url como parámetro
      }
    })
    return this.error; //Devolver el error
  }

  redirect(url){
    this.router.navigate([url])
  }

}
