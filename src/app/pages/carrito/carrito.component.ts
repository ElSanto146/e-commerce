import { Component, OnInit } from '@angular/core';
import { IProducto } from '../../models/products.model';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../service/cart-service.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

 // product?: IProducto;
  productosEnCarrito: IProducto[] = [];
  //productos?: IProducto;
  loading: boolean = true;

  //Inyectar dependencias
  constructor(/*private _route: ActivatedRoute, private _apiService: ApiServiceService,*/ private _cartService: CartServiceService) { }

  ngOnInit(): void {
    //Obtener el producto por ID al cargar el componente
    this._cartService.getCartList().subscribe((productos: IProducto[]) => {
      this.productosEnCarrito = productos;
      this.loading = false;
    });
  }

  delete(producto: IProducto): void {
    this.productosEnCarrito = this.productosEnCarrito.filter((p: IProducto) => p.id !== producto.id);
    this._cartService.decrementarCart();
  }

  getTotal(): number{
    return this.productosEnCarrito.reduce((total, producto) => total + producto.price, 0);
  }

  checkout() {
    //
    }

}
