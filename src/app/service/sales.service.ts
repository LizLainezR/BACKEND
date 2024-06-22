import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InvoicePick } from '../model/sale-model';
import { ProductDataToSave, ProductResponse } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private ApiSale = `${environment.API_URL}`;
  constructor(private http: HttpClient) { }

  getProductDetailsByCode(id_product: string): Observable<any> {
    return this.http.get<any>(`${this.ApiSale}/products/${id_product}`); 
  }

  createInvoice(invoiceData: InvoicePick): Observable<any> {
    const url = `${this.ApiSale}/sales`; 
    return this.http.post<any>(url, invoiceData);
  }
 

  obtenerProductos(): Observable<ProductDataToSave[]> {
    return this.http.get<ProductDataToSave[]>(`${this.ApiSale}/ListaProduct`);
  }
  
  getProductBySku(sku: string): Observable<ProductResponse | null> {
    return this.http.get<ProductResponse| null>(`${this.ApiSale}/products/${sku}`);
  }
  
}
