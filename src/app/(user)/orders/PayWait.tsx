/** @format */
"use client";
import BtnDefault from "@/components/button/BtnDefault";
import showRupiah from "@/services/rupiah";
import OrdersTypes from "@/types/Orders";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderProduct from "./OrderProduct";

type Props = {
  order: OrdersTypes;
  snapLoaded: boolean;
};

const PayWait = ({ order, snapLoaded }: Props) => {
  // state
  const [timeLeft, setTimeLeft] = useState("");
  const [pay, setPay] = useState(true);
  //   router
  const router = useRouter();

  console.log({ order });
  useEffect(() => {
    // Menambahkan 120 menit ke waktu created_at
    const endTime = moment(order?.created_at).add(60, "minutes");

    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(endTime.diff(now));

      const timeFormatted = `${duration.hours()} jam, ${duration.minutes()} menit, ${duration.seconds()} detik`;
      setTimeLeft(timeFormatted);

      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
        setTimeLeft("Time is up!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order?.created_at]);

  // setPay false if time 0
  useEffect(() => {
    if (timeLeft === "Time is up!") {
      setPay(false);
    }
  }, [timeLeft]);

  const openSnap = async () => {
    if (!snapLoaded) {
      alert("Snap.js is not loaded yet!");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.snap.pay(order.snap_token, {
      onSuccess: function (result: any) {
        /* Handle success */
        console.log({ result });
        router.push("/orders");
      },
      onPending: function (result: any) {
        /* Handle pending */
        console.log({ result });
        router.push("/orders");
      },
      onError: function (result: any) {
        /* Handle error */
        console.log({ result });
        router.push("/orders");
      },
      onClose: function () {
        /* Handle when user close the popup without finishing payment */
        router.push("/orders");
        console.log("user closed the popup");
      },
    });
  };
  //   const productWithImages =
  //     order.product_variant.product_variant_images?.filter(
  //       (variant) => variant.product_img
  //     );

  //   const img =
  //     productWithImages.length > 0
  //       ? `${BASE_URL}/${productWithImages[0].product_img}`
  //       : "/images/no_image.jpg";
  return (
    <div key={order.id}>
      <div className="">
        <div>
          {order?.order_items.map((item) => (
            <OrderProduct
              product_variant={item.product_variant}
              quantity={item.quantity}
              key={item.id}
            />
          ))}
        </div>
      </div>
      {/* metode pembayaran */}
      <div className="mt-10">
        {/* rincian pembayaran */}
        <h1 className="text-center font-bold mb-4">
          Rincian pembayaran
          <hr />
        </h1>
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex justify-between grow">
            <span className="font-semibold">Subtotal</span>
            <span className="font-semibold">
              {showRupiah(order.total_price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Ongkir</span>
            <span className="font-semibold">
              {showRupiah(order.shipping_cost.shipping_cost)}
            </span>
          </div>
          <div className="flex justify-between text-primary">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">
              {showRupiah(order.total_payment)}
            </span>
          </div>
        </div>
        {pay ? (
          <div className="flex flex-col gap-y-4 mt-10">
            <p className="text-lg text-center">{timeLeft}</p>
            <BtnDefault onClick={openSnap}>Bayar</BtnDefault>
          </div>
        ) : (
          <p>Waktu pembayaran telah habis</p>
        )}
      </div>
    </div>
  );
};

export default PayWait;
