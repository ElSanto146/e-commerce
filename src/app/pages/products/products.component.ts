import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartServiceService } from './../../service/cart-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  cartMessage: string | null = null;
  //constructor(@Inject(CartServiceService) private cartService: CartServiceService) { }
  private _cartService = inject(CartServiceService);

  addToCart(): void {

    this._cartService.incrementCart();//Incrementar el contador del carrito

    this.cartMessage = 'Se agregadó al carrito';
    setTimeout(() => {
      this.cartMessage = null; // Oculta el mensaje después de 3 segundos
    }, 1500);
  } 

}
