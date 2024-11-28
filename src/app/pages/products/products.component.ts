import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  cartMessage: string | null = null;

  addToCart(): void {
    this.cartMessage = 'Producto agregado al carrito';
    setTimeout(() => {
      this.cartMessage = null; // Oculta el mensaje después de 3 segundos
    }, 2000);
  } 

}
