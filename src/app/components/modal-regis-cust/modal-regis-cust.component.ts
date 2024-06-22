import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer, CustomerCreationData, CustomerType } from '../../model/client-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
//const $: any = window[]
@Component({
  selector: 'app-modal-regis-cust',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './modal-regis-cust.component.html',
  styleUrl: './modal-regis-cust.component.css'
})
export class ModalRegisCustComponent {
  newCustomer: Customer = {
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

  customerTypes: CustomerType[] = [];
  title: string = '';

  @ViewChild('modal') modal?: ElementRef;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomerTypes();
    console.log(this.customerTypes);
    console.log("aqui hay algo"); 
  }

  loadCustomerTypes(): void {
    this.customerService.getAllCustomerTypes().subscribe(
      types => {
        this.customerTypes = types;
      },     
      error => {
        console.error('Error al cargar los tipos de cliente:', error);
      }
    );
  }

  registerCustomer(): void {
    this.customerService.createCustomer(this.newCustomer).subscribe(
      response => {
        console.log('Cliente creado exitosamente:', response);
        this.newCustomer = {
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
        // Aquí puedes agregar lógica adicional después de crear el cliente
        // Por ejemplo, cerrar el modal o mostrar un mensaje de éxito.
      },
      error => {
        console.error('Error al crear el cliente:', error);
      }
    );
  }

  openModal(title: string): void {
    this.title = title;
    if (this.modal) {
      this.modal.nativeElement.classList.add('show');
      this.modal.nativeElement.style.display = 'block';
    }
  }

  closeModal(): void {
    if (this.modal) {
      this.modal.nativeElement.classList.remove('show');
      this.modal.nativeElement.style.display = 'none';
    }
  }
}
