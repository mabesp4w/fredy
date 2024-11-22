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
import VariantsTypes from "@/types/Variants";
import useVariants from "@/stores/crud/Variants";

type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: VariantsTypes | null;
  halaman: string;
  productId: string;
};
// variants
const Form = ({
  showModal,
  setShowModal,
  dtEdit,
  halaman,
  productId,
}: Props) => {
  // store
  const { addData, updateData } = useVariants();
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
  } = useForm<VariantsTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("variant_nm", "");
    setValue("attribute_nm", "");
    setValue("price", 0);
    setValue("stock", 0);
    setValue("description", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("variant_nm", dtEdit.variant_nm);
      setValue("attribute_nm", dtEdit.attribute_nm);
      setValue("price", dtEdit.price);
      setValue("stock", dtEdit.stock);
      setValue("description", dtEdit.description);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<VariantsTypes> = async (row) => {
    row.product_id = productId;
    //  submit data
    // console.log({ row });
    // return;
    submitData({
      row,
      dtEdit,
      setIsLoading,
      setShowModal,
      addData,
      updateData,
      resetForm,
      toastShow,
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
            dtEdit={dtEdit}
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
