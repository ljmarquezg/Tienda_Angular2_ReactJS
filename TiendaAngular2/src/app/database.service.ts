import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DatabaseService {

  constructor( private http : Http ) { }

  getUsuarios(){
    return this.http.get('https://tienda-angular2.firebaseio.com/usuarios/.json')
    .map((response : Response) => response.json())
  }
}
