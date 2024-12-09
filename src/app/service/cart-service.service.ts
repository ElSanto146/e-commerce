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

  //Obtener el carrito como observable para que los componentes puedan suscribirse
  getCartList(){
    return this.cartSubject.asObservable();
  }

  //Agregar un produco al carrito
  addProductToCart(product: IProducto): void{
    const existingProduct = this.cartList.find((p) => p.id === product.id);//Buscar si el producto ya está en el carrito

    if(existingProduct){
      //Incrementar cantidad si ya existe
      existingProduct.cantidad +=1;
      this.incrementCart();//Incrementar el contador
    }else{
      //Agregar nuevo producto con cantidad inicial 1
      this.cartList.push({ ...product, cantidad: 1 });
      this.incrementCart();//Incrementar el contador
    }
    this.cartSubject.next(this.cartList);//Notificar cambios a los suscriptores        
  }

  //Decrementar cantidad o eliminar un producto del carrito
  deleteProductFromCart(productId: number): void{
    const productIndex = this.cartList.findIndex((p) => p.id === productId);//Buscar el índice del producto

    if (productIndex !== -1) {
      const product = this.cartList[productIndex];//Obtener el producto
      
      if (product.cantidad > 1) {
        product.cantidad! -= 1;//Decrementar la cantidad
        this.decrementarCart();//Decrementar el contador        
      } else {
        this.cartList.splice(productIndex, 1);//Eliminar el producto del carrito
        this.decrementarCart();//Decrementar el contador
      }
    }
    this.cartSubject.next(this.cartList);//Notificar a los suscriptores    
  }

  //Limpiar el carrito
  clearCart(): void{
    this.cartList = [];//Vaciar la lista
    this.cartCount.next(0);//Reiniciar el contador
    this.cartSubject.next(this.cartList);//Notificar a los suscriptores
  }

}
