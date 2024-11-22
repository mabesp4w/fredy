/** @format */

import { BASE_URL } from "@/services/baseURL";
import ProductsTypes from "@/types/Products";
import Image from "next/image";
import { FC } from "react";

type Props = {
  product: ProductsTypes;
};

const ProductLite: FC<Props> = ({ product }) => {
  const productWithImages = product.product_variants.filter(
    (variant) => variant.product_variant_images.length > 0
  );

  const img =
    productWithImages.length > 0
      ? `${BASE_URL}/${productWithImages[0].product_variant_images[0].product_img}`
      : "/images/no_image.jpg";

  return (
    <div className="card bg-base-100 w-72 h-[24rem] shadow-xl">
      <figure className="relative h-full">
        <Image src={img} alt="Shoes" fill className="w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductLite;
