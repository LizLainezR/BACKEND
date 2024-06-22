import { Injectable } from '@angular/core';
import { Customer, CustomerCreationData, CustomerResponse, TipoClienteCreation } from '../model/client-model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductDataToSave } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private Apicustomers = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  createCustomer(customer: CustomerCreationData): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.Apicustomers}/Regcustomers`, customer);
  }
  searchCustomerById(id: string): Observable<CustomerResponse | null> {
    return this.http.get<CustomerResponse | null>(`${this.Apicustomers}/customers/${id}`);
  } 
  getAllCustomerTypes(): Observable<TipoClienteCreation[]> {
    return this.http.get<TipoClienteCreation[]>(`${this.Apicustomers}/customer_types`);
  }
 
}
