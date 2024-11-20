import ProductsTypes from "./Products";

// Carts
export default interface CartsTypes {
    id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    total_price: number;
    product: ProductsTypes;
}
