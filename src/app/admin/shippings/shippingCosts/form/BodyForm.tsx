/** @format */
"use client";
import InputRupiah from "@/components/input/InputRupiah";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useSubDistricts from "@/stores/crud/SubDistricts";
import ShippingCostsTypes from "@/types/ShippingCosts";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

// shippingCosts
type Props = {
  register: unknown;
  errors: FieldErrors<ShippingCostsTypes>;
  dtEdit: ShippingCostsTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ register, errors, showModal, control }) => {
  // store
  const { setSubDistricts, dtSubDistricts } = useSubDistricts();
  // state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // fetch
  const fetchSubDistricts = useCallback(async () => {
    setIsLoading(true);
    await setSubDistricts({ page: 1, limit: 10 });
    setIsLoading(false);
  }, [setSubDistricts]);

  // call fetch
  useEffect(() => {
    fetchSubDistricts();
  }, [showModal]);

  return (
    <>
      {!isLoading && (
        <SelectFromDb
          label="Kecamatan/Distrik"
          placeholder="Pilih Kecamatan/Distrik"
          name="sub_district_id"
          dataDb={dtSubDistricts.data}
          body={["id", "sub_district_nm"]}
          control={control}
          required
          errors={errors.sub_district_id}
          addClass="col-span-8 text-black relative"
          menuPortalTarget
        />
      )}
      <InputTextDefault
        label="Kelurahan"
        name="village_nm"
        register={register}
        errors={errors.village_nm}
        required
        addClass="col-span-8"
      />
      <InputRupiah
        label="Ongkos"
        control={control}
        name="shipping_cost"
        errors={errors.shipping_cost}
        addClass="col-span-8"
        required
        minLength={0}
      />
    </>
  );
};

export default BodyForm;
