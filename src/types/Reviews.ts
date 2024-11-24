import { User } from ".";
import OrdersTypes from "./Orders";
import ProductsTypes from "./Products";
// reviews
export default interface ReviewsTypes {
    id: string;
    product_id: string;
    user_id: string;
    order_id: string;
    rating: string;
    comment: string;
    product: ProductsTypes;
    order: OrdersTypes;
    user: User;
}
