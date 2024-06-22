interface Payment {
  payment_id: number;
  name_payment: string;
}

 interface SaleHeader {
  issue_date: string; // O ajustar según el tipo de dato en Laravel (puede ser Date)
  document_type: 'Factura' | 'Otro';
  person: 'Consumidor Final' | 'Otro';
  reference?: string;
  seller_id: number;
  due_date: string; // O ajustar según el tipo de dato en Laravel (puede ser Date)
  total_sale: number;
  discount: number;
  Iva: number;
  id_unique: string;
  payment_id: number;
}

 interface SaleDetail {
  id_product: string;
  amount: number;
  unit_price: number;
  subtotal: number;
}

 interface CashPayment {
  amount_received: number;
}

 interface TransferPayment {
  bank_name: string;
  account_number: string;
  transaction_reference: string;
}

// Tipo Pick para Payment
export type PaymentPick = Pick<Payment, 'payment_id' | 'name_payment'>;

// Tipo Pick para SaleHeader
export type SaleHeaderPick = Pick<SaleHeader, 'issue_date' | 'document_type' | 'person' | 'reference' | 'seller_id' | 'due_date' | 'total_sale' | 'discount' | 'Iva' | 'id_unique' | 'payment_id'>;

// Tipo Pick para SaleDetail
export type SaleDetailPick = Pick<SaleDetail, 'id_product' | 'amount' | 'unit_price' | 'subtotal'>;

// Tipo Pick para CashPayment
export type CashPaymentPick = Pick<CashPayment, 'amount_received'>;

// Tipo Pick para TransferPayment
export type TransferPaymentPick = Pick<TransferPayment, 'bank_name' | 'account_number' | 'transaction_reference'>;

// Tipo Pick para Invoice (Factura)
export type InvoicePick = {
  header: SaleHeaderPick;
  details: SaleDetailPick[];
  payment_method: 'cash' | 'transfer';
  cash_payment?: CashPaymentPick;
  transfer_payment?: TransferPaymentPick;
};
