import { Component, OnInit } from '@angular/core';
import { IProducto } from '../../models/products.model';
import { Router, RouterLink, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../service/cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CarritoComponent implements OnInit {

  productosEnCarrito: IProducto[] = [];
  loading: boolean = true;

  //Inyectar dependencias
  constructor(private _cartService: CartServiceService, private _router: Router) { }

  ngOnInit(): void {
    //Suscribirse a los cambios en el carrito
    this._cartService.getCartList().subscribe((productos) => {
      this.productosEnCarrito = productos;
      this.loading = false;
    });
  }

  //Incrementar cantidad
  increaseQuantity(producto: IProducto): void {
    this._cartService.addProductToCart(producto);//Agregar producto al carrito
  }

  //Decrementar cantidad
  decreaseQuantity(producto: IProducto): void {
    this._cartService.deleteProductFromCart(producto.id);//Eliminar producto del carrito
  }

  delete(producto: IProducto): void {
    this._cartService.deleteProductFromCart(producto.id);//Eliminar producto del carrito
  }

  getTotal(): number{
    return this.productosEnCarrito.reduce((total, producto) => total + producto.price, 0);
  }

  getTotalItems(): number{
    return this.productosEnCarrito.reduce((total, producto) => total + (producto.price * producto.cantidad!), 0);
  }

  checkout() {
    this._router.navigate(['/passerelle', { total: this.getTotalItems() }]);
    this._cartService.clearCart();
    }

}
