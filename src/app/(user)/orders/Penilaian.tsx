/** @format */

import BtnDefault from "@/components/button/BtnDefault";
import InputTextDefault from "@/components/input/InputTextDefault";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import ModalDefault from "@/components/modal/ModalDefault";
import submitData from "@/services/submitData";
import useOrdersApi from "@/stores/api/Orders";
import useReviews from "@/stores/crud/Reviews";
import OrdersTypes from "@/types/Orders";
import ReviewsTypes from "@/types/Reviews";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toastShow from "@/utils/toast-show";
import RatingStars from "@/components/shop/RatingStars";
import { BASE_URL } from "@/services/baseURL";
import Image from "next/image";
import StarRating from "@/components/shop/StarRating";

type Props = {
  order: OrdersTypes;
  showModal: boolean;
  setShowModal: (data: boolean) => void;
};

const Penilaian = ({ order, showModal, setShowModal }: Props) => {
  // store
  const { setOrdersAll } = useOrdersApi();
  const { addData } = useReviews();
  // state
  const [isLoading, setIsLoading] = useState(false);

  // hook form
  const { register, handleSubmit, control } = useForm<ReviewsTypes>();

  // reset form
  const resetForm = () => {};

  // simpan data
  const onSubmit: SubmitHandler<ReviewsTypes> = async (row) => {
    row.user_id = order.user_id;
    row.order_id = order.id;
    // console.log({ row });
    // return;
    await submitData({
      row,
      setIsLoading,
      setShowModal,
      addData,
      resetForm,
      toastShow,
    });
    await setOrdersAll({
      user_id: order.user_id,
      status: order.shipping_status?.status,
    });
  };
  return (
    <ModalDefault
      showModal={showModal}
      setShowModal={setShowModal}
      title="Penilaian"
    >
      {order.review.length > 0 && (
        <div className="flex flex-col gap-y-4">
          {order.review.map((item) => {
            return (
              <div key={item.id} className="flex flex-col border-b shadow-md">
                <h1>{item?.product_variant?.product?.product_nm}</h1>
                <p>
                  <RatingStars rating={item?.rating} />
                </p>
                <p>{item?.comment}</p>
              </div>
            );
          })}
        </div>
      )}
      {order.review.length === 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-8 gap-2 mb-4 gap-y-10">
            {order.order_items.map((product, index) => {
              const img = product?.product_variant.product_variant_images[0];
              const urlImg = img
                ? `${BASE_URL}/${img.product_img}`
                : "/images/no_image.png";
              return (
                <div key={product.id} className="flex flex-col col-span-8">
                  <div className="flex border-y h-24 col-span-8 items-center">
                    <Image
                      width={100}
                      height={100}
                      src={urlImg}
                      alt={product.product_variant.product.product_nm}
                      className="h-24 object-cover"
                    />
                    <div className="ml-4 w-full">
                      <h1 className="">
                        {product.product_variant.product.product_nm}
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-8">
                    <Controller
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      name={`rating[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <StarRating
                          totalStars={5}
                          onChangeRating={field.onChange}
                          name={field.name}
                        />
                      )}
                    />
                  </div>
                  <InputTextDefault
                    name={`product_variant_id[${index}]`}
                    register={register}
                    type="hidden"
                    value={product.product_variant_id}
                  />
                  <InputTextDefault
                    label="Komentar"
                    name={`comment[${index}]`}
                    register={register}
                    addClass="col-span-8"
                  />
                </div>
              );
            })}
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
      )}
    </ModalDefault>
  );
};

export default Penilaian;
