import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }

  private cartCount = new BehaviorSubject<number>(0);//Estado inicial del carrito
  cartCount$ = this.cartCount.asObservable();//Observable para suscribirse al contador

  incrementCart(): void{
    this.cartCount.next(this.cartCount.value + 1);//Incrementar el contador
  }

  getCartCount(): number{
    return this.cartCount.value;//Obtener el valor actual
  }

}
