/** @format */
"use client";
import SelectDef from "@/components/select/SelectDef";
import ShippingStatusesTypes from "@/types/ShippingStatuses";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// orders
type Props = {
  register: unknown;
  errors: FieldErrors<ShippingStatusesTypes>;
  dtEdit?: ShippingStatusesTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ control, errors }) => {
  return (
    <>
      <SelectDef
        name="status"
        label="Status Kirim"
        placeholder="Pilih Status Kirim"
        options={[
          { value: "dikemas", label: "Dikemas" },
          { value: "dikirim", label: "Dikirim" },
          { value: "selesai", label: "Selesai" },
        ]}
        addClass={"col-span-8"}
        required
        errors={errors.status}
        control={control}
      />
    </>
  );
};

export default BodyForm;
