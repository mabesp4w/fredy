/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import CategoriesTypes from "@/types/Categories";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// categories
type Props = {
  register: unknown;
  errors: FieldErrors<CategoriesTypes>;
  dtEdit: CategoriesTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <InputTextDefault
        label="Jenis Makanan"
        name="category_nm"
        register={register}
        errors={errors.category_nm}
        required
        addClass="col-span-8"
      />
    </>
  );
};

export default BodyForm;
