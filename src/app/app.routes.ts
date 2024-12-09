import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CarritoComponent } from './pages/cart/cart.component';
import { PasarelaComponent } from './pages/passerelle/pasarela.component';
import { NewComponent } from './pages/new/new.component';
import { SaleComponent } from './pages/sale/sale.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product/:id', component: ProductDetailComponent},
    {path: 'cart', component: CarritoComponent},
    {path: 'passerelle', component: PasarelaComponent},
    {path: 'new', component: NewComponent},
    {path: 'sale', component: SaleComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
