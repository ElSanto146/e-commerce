import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';
import { IProducto } from '../../models/products.model';
import { CartServiceService } from '../../service/cart-service.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit {

  productosOfertas: IProducto[] = [];
  loading: boolean = true;

  constructor(private _apiService: ApiServiceService, private _cartService: CartServiceService) { }
  ngOnInit(): void {
    this._apiService.getNewProducts().subscribe((data: IProducto[]) => {
      this.productosOfertas = data;
      this.loading = false;
    });
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


}
