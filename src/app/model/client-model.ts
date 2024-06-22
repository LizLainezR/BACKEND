// src/app/models/customer.model.ts
export interface Customer {
  id_unique: string;
    full_name: string;
    business_name?: string;
    city?: string;
    address?: string;
    cell_phone?: string;
    whatsapp?: string;
    email: string;
    idcustomer_types?: number;
    observations?: string;
  }
  
  
  
  export interface CustomerType{
    idcustomer_types: number;
    name: string;
  }
  
  // Define los tipos derivados usando Pick
  
  export type CustomerBasicInfo = Pick<Customer, 'id_unique' | 'full_name' | 'email'>;
  export type CustomerContactInfo = Pick<Customer, 'address' | 'cell_phone' | 'whatsapp' | 'email'>;
  export type CustomerCreationData = Pick<Customer, 'id_unique' | 'full_name' | 'business_name' | 'city' | 'address' | 'cell_phone' | 'whatsapp' | 'email' | 'idcustomer_types' | 'observations'>;
  export type CustomerUpdateData = Pick<Customer,   'email' | 'address'| 'cell_phone' | 'whatsapp' | 'observations'>;
  export type CustomerResponse = Pick<Customer,   'id_unique' | 'full_name' | 'email' | 'address'>;

// TipoClienteCreation
export type TipoClienteCreation = Pick<CustomerType, 'idcustomer_types'|'name'>;
// TipoClienteSearch
export type TipoClienteSearch = Pick<CustomerType, 'idcustomer_types'>;
