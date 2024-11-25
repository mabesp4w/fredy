/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import ModalDefault from "@/components/modal/ModalDefault";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import BtnDefault from "@/components/button/BtnDefault";
import submitData from "@/services/submitData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useOrders from "@/stores/crud/Orders";
import ShippingStatusesTypes from "@/types/ShippingStatuses";

type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: ShippingStatusesTypes | null;
  halaman: string;
};
// orders
const Form = ({ showModal, setShowModal, dtEdit, halaman }: Props) => {
  // store
  const { addData, updateData, setOrders } = useOrders();
  // state
  const [isLoading, setIsLoading] = useState(false);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<ShippingStatusesTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("status", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("status", dtEdit.status);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<ShippingStatusesTypes> = async (row) => {
    //  submit data
    // console.log({ row });
    // return;
    await submitData({
      row,
      dtEdit,
      setIsLoading,
      setShowModal,
      addData,
      updateData,
      resetForm,
      toastShow,
    });
    await setOrders({
      page: 1,
      limit: 10,
      status: "dibayar,selesai",
    });
  };

  return (
    <ModalDefault
      title={`Form ${halaman}`}
      showModal={showModal}
      setShowModal={setShowModal}
      width="md:w-[50rem] lg:w-[65rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />
        <div className="grid grid-cols-8 gap-2 mb-4">
          <BodyForm
            register={register}
            errors={errors}
            dtEdit={dtEdit ?? null}
            control={control}
            watch={watch}
            setValue={setValue}
            showModal={showModal}
          />
        </div>
        <div>
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <BtnDefault onClick={handleSubmit(onSubmit)} type="submit">
              Simpan
            </BtnDefault>
          )}
        </div>
      </form>
    </ModalDefault>
  );
};

export default Form;
