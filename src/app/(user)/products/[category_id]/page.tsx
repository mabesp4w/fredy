/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import ProductLite from "@/components/shop/products/ProductLite";
import useCategoriesApi from "@/stores/api/Categories";
import useProductsApi from "@/stores/api/Products";
import ProductsTypes from "@/types/Products";
import React, { useEffect, useState } from "react";

const ProductCategories = ({ params }: { params: { category_id: string } }) => {
  const { category_id } = params;
  // state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // store
  const { setProductsWithParams, dtProducts } = useProductsApi();
  const { setShowCategories, showCategory } = useCategoriesApi();
  // effect
  useEffect(() => {
    setIsLoading(true);
    setProductsWithParams({ category_id });
    setShowCategories(category_id);
    setIsLoading(false);
    return () => {};
  }, [category_id, setProductsWithParams, setShowCategories]);

  return (
    <section className="grow container flex flex-col gap-y-8">
      <div>
        <h1 className="text-center font-bold text-2xl text-accent">
          Daftar Menu {showCategory?.category_nm}
        </h1>
        <hr />
      </div>
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-4 gap-4">
          {dtProducts.data.map((item: ProductsTypes) => (
            <ProductLite product={item} key={item.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductCategories;
