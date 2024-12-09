import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';
import { CartServiceService } from '../../service/cart-service.service';
import { IProducto } from '../../models/products.model';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit {

  productosOfertas: IProducto[]=[];
  loading: boolean = true;

  constructor(private _apiService: ApiServiceService, private _cartService: CartServiceService ) { }

  ngOnInit(): void {
    this._apiService.getSaleProducts().subscribe((data: IProducto[]) => {
      this.productosOfertas = data;
      this.loading = false;
    })
  }

  addToCart(product: IProducto):void{
    this._cartService.addProductToCart(product);

    product.message = '¡Se agregó al carrito!';
    setTimeout(() => {
      product.message = null;      
    }, 1500)
  }

  getDiscountedPrice(product: IProducto): number {
    return product.price + (product.price * 0.1);
  }

}
