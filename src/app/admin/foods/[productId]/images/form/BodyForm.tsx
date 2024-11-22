/** @format */
"use client";
import ProductImagesTypes from "@/types/ProductImages";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// productImages
type Props = {
  register: unknown;
  errors: FieldErrors<ProductImagesTypes>;
  dtEdit: ProductImagesTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({}) => {
  return <></>;
};

export default BodyForm;
