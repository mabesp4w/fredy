/** @format */

import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/services/rupiah";
import ProductsTypes from "@/types/Products";
import Image from "next/image";
import { FC } from "react";
import { BsCartPlusFill } from "react-icons/bs";

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

  const gotoDetail = (id: string) => {
    console.log({ id });
  };

  const tambah = () => {
    console.log("tambah");
  };

  return (
    <div
      className="card bg-base-100 w-full h-full shadow-xl hover:shadow-2xl cursor-pointer dark:bg-gray-800"
      onClick={() => gotoDetail(product.id)}
    >
      <figure className="relative h-40">
        <Image
          src={img}
          alt="Shoes"
          fill
          className="w-full h-40 object-cover"
        />
      </figure>
      <div className="card-body flex flex-col justify-between p-4">
        <div>
          <h2 className="card-title">{product.product_nm}</h2>
          <h3 className="text-sm">{product.category.category_nm}</h3>
        </div>
        <div className="flex justify-between gap-y-4">
          <span className="text-lg font-bold">
            {showRupiah(product.product_variants[0].price)}
          </span>
          <div className="card-actions justify-end">
            <BsCartPlusFill
              className="text-accent cursor-pointer hover:text-primary"
              size={30}
              onClick={(e) => {
                e.stopPropagation();
                tambah();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLite;
