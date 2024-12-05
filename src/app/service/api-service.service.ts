import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

  //Inyectar la dependencia de HttpClient
  private _http = inject(HttpClient);

  //Definir la URL base de la API
  private _urlBase = 'http://localhost:8080/api/v1/products';

  //Obtener todos los productos, llamando al servicio HttpClient
  getProducts(): Observable<any> {
    return this._http.get(this._urlBase);
  }

  //Obtener un producto por ID, llamando al servicio HttpClient
  getProductById(id: number): Observable<IProducto> {
    return this._http.get<IProducto>(`${this._urlBase}/find/${id}`);
  }

}
