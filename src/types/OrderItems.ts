import OrdersTypes from "./Orders";
import ProductsTypes from "./Products";

// orderItems
export default interface OrderItemsTypes {
    id: string;
    product_id: string;
    user_id: string;
    order_id: string;
    quantity: number;
    total_price: number;
    product: ProductsTypes;
    order: OrdersTypes;
}
