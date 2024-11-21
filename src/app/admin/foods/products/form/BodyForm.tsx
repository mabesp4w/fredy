/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useCategories from "@/stores/crud/Categories";
import ProductsTypes from "@/types/Products";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

// products
type Props = {
  register: unknown;
  errors: FieldErrors<ProductsTypes>;
  dtEdit: ProductsTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
  // store
  const { setCategories, dtCategories } = useCategories();
  // state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // fetch
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    await setCategories({ page: 1, limit: 10 });
    setIsLoading(false);
  }, [setCategories]);

  // call fetch
  useEffect(() => {
    fetchCategories();
  }, [showModal]);

  return (
    <>
      {!isLoading && (
        <SelectFromDb
          label="Jenis Makanan"
          placeholder="Pilih Jenis Makanan"
          name="category_id"
          dataDb={dtCategories.data}
          body={["id", "category_nm"]}
          control={control}
          required
          errors={errors.category_id}
          addClass="col-span-8 text-black relative"
          menuPortalTarget
        />
      )}
      <InputTextDefault
        label="Nama Makanan"
        name="product_nm"
        register={register}
        errors={errors.product_nm}
        required
        addClass="col-span-8"
      />
    </>
  );
};

export default BodyForm;
