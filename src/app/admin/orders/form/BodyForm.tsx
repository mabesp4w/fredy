/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import OrdersTypes from "@/types/Orders";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// orders
type Props = {
  register: unknown;
  errors: FieldErrors<OrdersTypes>;
  dtEdit: OrdersTypes | null;
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
        errors={errors.shipping_status?.status}
        required
        addClass="col-span-8"
      />
    </>
  );
};

export default BodyForm;
