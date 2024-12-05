import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducto } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartList: IProducto[] = [];//Lista de productos en el carrito
  private cartSubject = new BehaviorSubject<IProducto[]>(this.cartList);//Estado inicial del carrito

  private cartCount = new BehaviorSubject<number>(0);//Estado inicial del carrito
  cartCount$ = this.cartCount.asObservable();//Observable para suscribirse al contador

  constructor() { }

  incrementCart(): void{
    this.cartCount.next(this.cartCount.value + 1);//Incrementar el contador
  }

  decrementarCart(): void{
    this.cartCount.next(this.cartCount.value - 1);//Decrementar el contador
  }

  getCartCount(): number{
    return this.cartCount.value;//Obtener el valor actual
  } 

  getCart(){
    return this.cartSubject.asObservable();//Obtener los productos del carrito como un observable
  }

  getCartList(): Observable<IProducto[]>{
    return this.cartSubject.asObservable();//Obtener los productos del carrito
  }

  addProductToCart(product: IProducto): void{    
    this.cartList.push(product);//Agregar producto al carrito
    this.cartSubject.next(this.cartList);//Actualizar el estado del carrito
    this.incrementCart();//Incrementar el contador    
  }

}
