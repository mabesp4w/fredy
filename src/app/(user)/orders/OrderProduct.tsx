/** @format */

import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/services/rupiah";
import VariantsTypes from "@/types/Variants";
import Image from "next/image";
import React from "react";

type Props = {
  product_variant: VariantsTypes;
  quantity: number;
};

const OrderProduct = ({ product_variant, quantity }: Props) => {
  const img =
    product_variant.product_variant_images.length > 0
      ? product_variant.product_variant_images[0]
      : null;
  const urlImg = img
    ? `${BASE_URL}/${img.product_img}`
    : "/images/no_image.jpg";

  return (
    <div className="w-fit">
      <div className="flex flex-col lg:flex-row gap-x-12 mb-4">
        {/* image */}
        <div className="h-max-h-32">
          <Image
            width={100}
            height={100}
            src={urlImg}
            alt={product_variant.product.product_nm}
            className="w-40"
          />
        </div>
        {/* product detail */}
        <div className="w-full grow flex flex-col gap-y-2">
          {/* details */}
          <div className="flex flex-col gap-y-2">
            <h1 className="text-lg font-bold">
              {product_variant.product.product_nm}
            </h1>
            <p className="text-sm">
              {product_variant.variant_nm} x{quantity}
            </p>
            <h4 className="text-xl font-bold text-primary">
              {showRupiah(product_variant.price)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
