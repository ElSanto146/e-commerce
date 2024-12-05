import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartServiceService } from './service/cart-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartServiceService){}

  ngOnInit(): void{
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;//Actualizar elcontador del carrito
    });
  }
}
