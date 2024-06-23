import { Component } from '@angular/core';
import { Product, ProductResponse } from '../../../model/product-model';
import { SalesService } from '../../../service/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  products: ProductResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalProducts: number=0;
  searchTerm: string = '';
  tipoBusqueda: string = 'nombre';
  productosFiltrados = [];

  constructor(private productService: SalesService) { }

 // ngOnInit(): void {
   // this.totalProducts = this.productService.getTotalProducts();
   // this.loadProducts();}
   ngOnInit(): void {
     this.obtenerProductos();
    } 
   obtenerProductos(): void {
     this.productService.obtenerProductos()
       .subscribe(products => this.products = products);
   }
 
   verDetalle(id: number): void {
     // Aquí podrías implementar la lógica para redirigir al usuario al detalle del producto según el ID
     console.log(`Ver detalle del producto con ID: ${id}`);
   }
   buscarProductos(): void {
    // Convertir el término de búsqueda a minúsculas para hacer la búsqueda insensible a mayúsculas
    const term = this.searchTerm.toLowerCase().trim();

    // Filtrar los productos según el tipo de búsqueda seleccionado
    this.products
    
    
    = this.products.filter(producto => {
      if (this.tipoBusqueda === 'nombre') {
        return producto.product_name.toLowerCase().includes(term);
      //} else if (this.tipoBusqueda === 'codigo') {
       // return producto.description.toLowerCase().includes(term);
      } else {
        return false;
      }
    });
  } 
}
