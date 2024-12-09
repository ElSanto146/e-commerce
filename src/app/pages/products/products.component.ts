import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartServiceService } from './../../service/cart-service.service';
import { IProducto } from '../../models/products.model';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-products', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  //Variable de array de productos
  productList: IProducto[] = [];
  loading: boolean = true;

  //Inyectar dependencias
  private _router = inject(Router);
  private _apiService = inject(ApiServiceService);
  //constructor(@Inject(CartServiceService) private cartService: CartServiceService) { }
  private _cartService = inject(CartServiceService); 

  ngOnInit(): void { 
    //Obtener los productos al cargar el componente
    this._apiService.getProducts().subscribe((data: IProducto[]) => {
      this.productList = data;
      this.loading = false;
    })
  }

  //Función aumentar el contador del carrito y lanzar el mensaje
  addToCart(product: IProducto): void {
    //this._cartService.incrementCart();//Incrementar el contador del carrito
    this._cartService.addProductToCart(product);//Enviar el producto al carrito

    product.message = '¡Se agregadó al carrito!';
    setTimeout(() => {
      product.message = null; // Oculta el mensaje después de 1.5 segundos
    }, 1500); 
  } 

  getDiscountedPrice(product: IProducto): number {
    return product.price + (product.price * 0.1);
  }

}
