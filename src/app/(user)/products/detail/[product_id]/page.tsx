/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import ProductDetail from "@/components/shop/products/ProductDetail";
import useProductsApi from "@/stores/api/Products";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Details = ({ params }: { params: { product_id: string } }) => {
  const { product_id } = params;
  // state
  const [isLoading, setIsLoading] = useState(true);
  // store
  const { setShowProducts, showProduct } = useProductsApi();
  // effect
  useEffect(() => {
    setIsLoading(true);
    setShowProducts(product_id);
    setIsLoading(false);
    return () => {};
  }, [product_id, setShowProducts]);

  return (
    <section className="grow container flex flex-col gap-y-8">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={`/products/${showProduct?.category.id}`}>
              {showProduct?.category.category_nm}
            </Link>
          </li>
          <li>{showProduct?.product_nm}</li>
        </ul>
      </div>
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="w-[40rem] mx-auto">
          {showProduct && <ProductDetail product={showProduct} />}
        </div>
      )}
    </section>
  );
};

export default Details;
