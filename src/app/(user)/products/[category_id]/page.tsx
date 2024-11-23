/** @format */
"use client";
import useProductsApi from "@/stores/api/Products";
import React, { useEffect } from "react";

const ProductCategories = ({ params }: { params: { category_id: string } }) => {
  const { category_id } = params;
  // store
  const { setProductsWithParams, dtProducts } = useProductsApi();
  // effect
  useEffect(() => {
    setProductsWithParams({ category_id });

    return () => {};
  }, [category_id, setProductsWithParams]);

  console.log({ dtProducts });

  return <div>ProductCategories</div>;
};

export default ProductCategories;
