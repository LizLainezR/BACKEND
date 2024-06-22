import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';

import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer, CustomerCreationData, CustomerResponse, CustomerType,  } from '../../../model/client-model';
import { CustomerService } from '../../../service/customer.service';
import { ModalRegisCustComponent } from '../../../components/modal-regis-cust/modal-regis-cust.component';
import { NavbarComponent } from '../../../components/nav/navbar.component';
import { AuthService } from '../../../service/auth.service';
import { SalesService } from '../../../service/sales.service';
import { InvoicePick, SaleDetailPick, SaleHeaderPick } from '../../../model/sale-model';
import { Product, ProductCreationData, ProductResponse } from '../../../model/product-model';

@Component({
  selector: 'app-punto-ventas',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule, ModalRegisCustComponent, NavbarComponent],
  templateUrl: './punto-ventas.component.html',
  styleUrl: './punto-ventas.component.css'
})

export class PuntoVentasComponent {
  saleForm: FormGroup;
  customerExists = false;
  customerDetails: CustomerResponse | null = null;
  ProductsExists = false;
  ProductsDetail: ProductResponse | null = null;
  newProduct: ProductCreationData={
    sku :'', 
    product_name:'',
    description:'',
    img:'',
    unit_price:0,
    stock_quantity:0 , 
    stock_max: 0, 
    stock_min:0,
    id_category:0,
    id_pattern:0 ,
    id_product:0
  };
  newCustomer: CustomerCreationData = {
    id_unique: '',
    full_name: '',
    business_name: '',
    city: '',
    address: '',
    cell_phone: '',
    whatsapp: '',
    email: '',
    idcustomer_types: 0,
    observations: ''
  };
  showRegistrationForm = false;

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private customerService: CustomerService
  ) {
    this.saleForm = this.fb.group({
      issue_date: [''],
      document_type: ['Factura'],
      person: ['Consumidor Final'],
      reference: [''],
      seller_id: [1],
      due_date: [''],
      total_sale: [null],
      discount: [null],
      Iva: [null],
      id_unique: [''],
      payment_id: [null],
      sales: this.fb.array([]),
      payment_method: [''],
      transfer_payment: this.fb.group({
        bank_name: [''],
        account_number: [''],
        transaction_reference: ['']
      })
    });
  }

  ngOnInit(): void {
    this.addSaleRow();
  }

  get sales(): FormArray {
    return this.saleForm.get('sales') as FormArray;
  }

  addSaleRow(): void {
    const saleGroup = this.fb.group({
      code: [''],
      description: [''],
      unitPrice: [0],
      quantity: [0],
      discount: [0],
      totalValue: [0]
    });
    this.sales.push(saleGroup);
  }

  removeSaleRow(index: number): void {
    this.sales.removeAt(index);
  }

  calculateTotal(index: number): void {
    const sale = this.sales.at(index).value;
    const totalValue = (sale.unitPrice * sale.quantity) - sale.discount;
    this.sales.at(index).patchValue({ totalValue });
  }

  checkCustomerExists(): void {
    this.clearSearchResults();
    this.customerService.searchCustomerById(this.newCustomer.id_unique).subscribe(
      data => {
        if (data) {
          this.customerExists = true;
          this.customerDetails = data;
          this.newCustomer = {
            id_unique: data.id_unique,
            full_name: data.full_name,
            address: data.address,
            email: data.email,
          };
        } else {
          this.customerExists = false;
          this.customerDetails = null;
          this.showRegistrationForm = true;  
        }
      },
      error => console.error('There was an error!', error)
    );
  }


  clearSearchResults(): void {
    this.customerExists = false;
    this.customerDetails = null;
  }

  checkProductDetails(): void {
    this.clearSearchResults();
    this.salesService.getProductBySku(this.newProduct.sku).subscribe(
      dataPr => {
        if (dataPr) {
        /*  this.ProductsExists = true;
          this.ProductsDetail = dataPr;
          this.newProduct = {    
            sku :dataPr.sku, 
            product_name:dataPr.product_name,
            unit_price:dataPr.unit_price,
            stock_quantity:dataPr.stock_quantity , 
            id_product:dataPr.id_product,
             };
        } else {
          this.customerExists = false;
          this.customerDetails = null;
         // this.showRegistrationForm = true;  
        */}
      },
      error => {
        console.error('Error al buscar producto por SKU:', error);
        // Maneja el error de búsqueda de forma adecuada (por ejemplo, muestra un mensaje al usuario)
      }
    );
  }

  submit(): void {
    if (this.saleForm.valid) {
      const invoiceData: InvoicePick = {
        header: this.saleForm.value as SaleHeaderPick,
        details: this.saleForm.value.sales.map((sale: any) => ({
          id_product: sale.code,
          amount: sale.quantity,
          unit_price: sale.unitPrice,
          subtotal: sale.totalValue
        })) as SaleDetailPick[],
        payment_method: this.saleForm.value.payment_method,
        transfer_payment: {
          bank_name: this.saleForm.value.transfer_payment.bank_name,
          account_number: this.saleForm.value.transfer_payment.account_number,
          transaction_reference: this.saleForm.value.transfer_payment.transaction_reference
        }
      };

      this.salesService.createInvoice(invoiceData).subscribe(
        response => {
          console.log('Factura creada exitosamente:', response);
          // Reiniciar formulario o realizar acciones adicionales después de crear la factura
        },
        error => {
          console.error('Error al crear la factura:', error);
          // Manejar errores de creación de factura
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }
}
  
 