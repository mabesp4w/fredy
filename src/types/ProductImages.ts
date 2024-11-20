import ProductsTypes from "./Products";

// productImages
export default interface ProductImagesTypes {
    id: string;
    product_id: string;
    position: number;
    product_img: string;
    product: ProductsTypes;
}
