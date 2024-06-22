interface Category {
    id_category: number;
    category_name: string;
    status: boolean;
}

interface Trademark {
    id_trademark: number;
    trademark_name: string;
    status: boolean;
}

interface Pattern {
    id_pattern: number;
    models_name: string;
    id_trademark: number;
    status: boolean;
}

interface Product {
    id_product: number;
    sku:string;
    product_name: string;
    description: string;
    img: string;
    unit_price: number;
    stock_quantity: number;
    stock_max: number;
    stock_min: number;
    status: boolean;
    id_category: number;
    id_pattern: number;
}

type CategoryDataToSave = Pick<Category, 'category_name' | 'status'>;
type TrademarkDataToSave = Pick<Trademark, 'trademark_name' | 'status'>;
type PatternDataToSave = Pick<Pattern, 'models_name' | 'id_trademark' | 'status'>;
type ProductCreationData = Pick<Product, 'sku'| 'product_name' | 'description' | 'img' | 'unit_price' | 'stock_quantity' | 'stock_max' | 'stock_min' | 'id_category' | 'id_pattern' | 'id_product' >;
type ProductResponse = Pick<Product,'sku'| 'product_name' | 'unit_price' | 'stock_quantity' | 'id_product' >;

export { Category, Trademark, Pattern, Product, CategoryDataToSave, TrademarkDataToSave, PatternDataToSave, ProductCreationData ,ProductResponse };
