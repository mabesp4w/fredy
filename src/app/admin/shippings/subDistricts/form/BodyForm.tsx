/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import SubDistrictsTypes from "@/types/SubDistricts";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

// subdistricts
type Props = {
  register: unknown;
  errors: FieldErrors<SubDistrictsTypes>;
  dtEdit: SubDistrictsTypes | null;
  control: unknown;
  watch: unknown;
  setValue: unknown;
  showModal: boolean;
};
const BodyForm: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <InputTextDefault
        label="Nama "
        name="sub_district_nm"
        register={register}
        errors={errors.sub_district_nm}
        required
        addClass="col-span-8"
      />
    </>
  );
};

export default BodyForm;
