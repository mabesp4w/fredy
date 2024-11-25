/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import ModalDefault from "@/components/modal/ModalDefault";
import toastShow from "@/utils/toast-show";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BtnDefault from "@/components/button/BtnDefault";
import submitData from "@/services/submitData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import UserInfoTypes from "@/types/UserInfos";
import { User } from "@/types";
import useShippingCostsApi from "@/stores/api/ShippingCosts";
import SelectFromDb from "@/components/select/SelectFromDB";
import useUserInfos from "@/stores/crud/UserInfo";
import useLogin from "@/stores/auth/login";

type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: UserInfoTypes | null;
  user: User;
};

const Form = ({ showModal, setShowModal, dtEdit, user }: Props) => {
  // store
  const { addData, updateData } = useUserInfos();
  const { cekToken } = useLogin();
  // state
  const [isLoading, setIsLoading] = useState(false);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<UserInfoTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("nm_user", "");
    setValue("shipping_cost_id", "");
    setValue("address", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("nm_user", dtEdit.nm_user);
      setValue("shipping_cost_id", dtEdit.shipping_cost_id);
      setValue("user_id", dtEdit.user_id);
      setValue("address", dtEdit.address);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<UserInfoTypes> = async (row) => {
    row.is_active = true;
    row.user_id = user.id;
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

    await cekToken();
    setShowModal(false);
  };

  // store
  const { setShippingCostsAll, dtShippingCosts } = useShippingCostsApi();
  // fetch
  const fetchSubDistricts = useCallback(async () => {
    setIsLoading(true);
    await setShippingCostsAll();
    setIsLoading(false);
  }, [setShippingCostsAll]);

  // call fetch
  useEffect(() => {
    fetchSubDistricts();
  }, [showModal]);

  return (
    <ModalDefault
      title={`Form Data Diri`}
      showModal={showModal}
      setShowModal={setShowModal}
      width="md:w-[50rem] lg:w-[65rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />
        <div className="grid grid-cols-8 gap-2 mb-4">
          <InputTextDefault
            label="Nama Penerima"
            name="nm_user"
            register={register}
            errors={errors.nm_user}
            required
            addClass="col-span-8"
          />
          <InputTextDefault
            label="No. HP"
            name="phone_number"
            register={register}
            errors={errors.phone_number}
            required
            addClass="col-span-8"
          />
          {!isLoading && (
            <SelectFromDb
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              name="shipping_cost_id"
              dataDb={dtShippingCosts}
              body={["id", "sub_district.sub_district_nm", "village_nm"]}
              control={control}
              required
              errors={errors.shipping_cost_id}
              addClass="col-span-8 text-black relative"
              menuPortalTarget
            />
          )}
          <InputTextDefault
            label="Alamat"
            name="address"
            register={register}
            errors={errors.address}
            required
            addClass="col-span-8"
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
