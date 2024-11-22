/** @format */
"use client";
import InputTextSearch from "@/components/input/InputTextSearch";
import { FC } from "react";

type Props = {
  halaman: string;
  register: unknown;
  control: unknown;
  watch: unknown;
  setValue: unknown;
};

const Searching: FC<Props> = ({ register, setValue, watch, halaman }) => {
  return (
    <div className="grid grid-cols-8 gap-2 w-full">
      <InputTextSearch
        watch={watch as never}
        setValue={setValue as never}
        name="cari"
        register={register as never}
        placeholder={`Cari data ${halaman}`}
        addClass="col-span-8"
      />
    </div>
  );
};

export default Searching;
