/** @format */
"use client";

import ProductLite from "@/components/shop/products/ProductLite";
import useProductsApi from "@/stores/api/Products";
import { useEffect } from "react";

const Product = () => {
  // store
  const { setProductsWelcome, dtProductWelcome } = useProductsApi();
  // get data
  useEffect(() => {
    setProductsWelcome();
    return () => {};
  }, []);
  console.log({ dtProductWelcome });

  return (
    <>
      {/* best sellers */}
      <div className="relative h-[26rem] ">
        <div className="bg-neutral/50 backdrop-blur-xl h-[26rem] absolute left-1/2 transform -translate-x-1/2 -top-24 w-[96%] rounded-3xl">
          <div className="flex items-center gap-2 p-3">
            {dtProductWelcome?.bestSellers?.map((item: any, index: number) => (
              <ProductLite key={index} product={item} />
            ))}
          </div>
        </div>
      </div>
      {/* new products */}
      <div className="flex items-center gap-2 p-3">
        {dtProductWelcome?.newProduct?.map((item: any, index: number) => (
          <ProductLite key={index} product={item} />
        ))}
      </div>
    </>
  );
};

export default Product;
