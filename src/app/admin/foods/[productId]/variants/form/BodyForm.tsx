/** @format */
"use client";
import InputRupiah from "@/components/input/InputRupiah";
import InputTextDefault from "@/components/input/InputTextDefault";
import RichTextEditor from "@/components/input/RichTextEditor";
import SelectDef from "@/components/select/SelectDef";
import VariantsTypes from "@/types/Variants";
import { FC, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

// variants
type Props = {
  register: unknown;
  errors: FieldErrors<VariantsTypes>;
  dtEdit: VariantsTypes | null;
  control: unknown;
  watch: any;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  watch,
  setValue,
  dtEdit,
}) => {
  const [variation, setVariation] = useState<string>("");

  const attribute = watch("attribute_nm");
  useEffect(() => {
    setVariation(attribute);

    return () => {};
  }, [attribute]);

  return (
    <>
      <SelectDef
        label="Variasi"
        placeholder="Pilih Variasi"
        control={control}
        name="attribute_nm"
        options={[
          { value: "warna", label: "Warna" },
          { value: "ukuran", label: "Ukuran" },
        ]}
        addClass={`col-span-8 lg:col-span-4`}
      />

      <InputTextDefault
        label={variation}
        name="variant_nm"
        register={register}
        errors={errors.variant_nm}
        required
        addClass="col-span-8 lg:col-span-4"
      />

      <InputTextDefault
        label="Stock"
        name="stock"
        register={register}
        errors={errors.stock}
        required
        type="number"
        min={1}
        addClass="col-span-8 lg:col-span-2"
      />
      <InputRupiah
        label="Harga"
        control={control}
        name="price"
        errors={errors.price}
        addClass="col-span-8  lg:col-span-6"
        required
        minLength={1}
      />
      <RichTextEditor
        control={control}
        name="description"
        label="Description"
        addClass="col-span-8"
        errors={errors.description}
        initialValue={dtEdit?.description || ""}
        setValue={setValue}
      />
    </>
  );
};

export default BodyForm;
