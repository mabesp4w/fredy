/** @format */
"use client";
import useOrders from "@/stores/crud/Orders";
import { User } from "@/types";
import CartsTypes from "@/types/Carts";
import OrdersTypes from "@/types/Orders";
import React, { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import LoadingSpiner from "../loading/LoadingSpiner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/services/baseURL";
import useCartsApi from "@/stores/api/Carts";

interface Props {
  isModalOpen: boolean;
  setModalOpen: (data: boolean) => void;
  carts: CartsTypes[];
  user: User;
  MIDTRANS_CLIENT_KEY: string;
}

const Question = ({
  isModalOpen,
  setModalOpen,
  carts,
  user,
  MIDTRANS_CLIENT_KEY,
}: Props) => {
  // Untuk mencegah scroll di belakang sidebar
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const onClose = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === "question-overlay") {
      onClose();
    }
  };
  // state
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // store
  const { addData } = useOrders();
  const { setCarts } = useCartsApi();
  //   router
  const router = useRouter();

  // useEffect
  useEffect(() => {
    // Memuat skrip Snap.js
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // URL untuk sandbox atau production
    //  get MIDTRANS_CLIENT_KEY from .env
    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY || "");
    script.onload = () => setSnapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleSubmit = async () => {
    setIsLoading(true);
    const shipping = user?.user_info && user.user_info[0];

    const total_price = carts?.reduce(
      (acc, cart) => acc + cart.product_variant.price * cart.quantity,
      0
    );
    const total_payment =
      total_price + (shipping?.shipping_cost.shipping_cost || 0);

    const row = {
      user_id: user?.id,
      shipping_cost_id: user?.user_info && user.user_info[0].shipping_cost_id,
      total_price,
      total_payment,
      status: "tunggu",
      shipping_cost: shipping && shipping.shipping_cost.shipping_cost,
      address: user?.user_info && user?.user_info[0].address,
      carts,
    };
    const res = await addData(row);
    await setCarts({ user_id: user?.id });
    console.log({ res });
    if (res.status === "success") {
      setModalOpen(false);
      handlePayment(res.data.data);
      router.push("/orders");
    }
    setIsLoading(false);
  };

  const handlePayment = async (order: OrdersTypes) => {
    if (!snapLoaded) {
      alert("Snap.js is not loaded yet!");
      return;
    }
    const response = await axios.post(`${BASE_URL}/api/payment`, {
      order_id: order.id,
    });
    const snapToken = response.data;
    // Gunakan snapToken untuk membuka Snap popup
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.snap.pay(snapToken, {
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
        console.log("user closed the popup");
        router.push("/orders");
      },
    });
  };
  return (
    isModalOpen && (
      <section
        className="fixed inset-0 h-screen flex items-center justify-center z-50 bg-black/[0.2]"
        id="question-overlay"
        onClick={handleClickOutside}
      >
        <div className="bg-white text-black p-5 rounded-xl w-[500px] h-min mt-[10%] max-h-[70%] overflow-hidden">
          {/* header */}
          <div className="flex flex-row items-center justify-between border-b border-primary/[0.2] mb-4 pb-2">
            <h5 className="text-xl font-roboto">Yakin?</h5>
            <BsXLg
              className="cursor-pointer hover:text-primary"
              onClick={() => setModalOpen(false)}
            />
          </div>
          {/* body */}
          <div className="overflow-auto">
            <p>Setalah melanjutkan keproses pembayaran.</p>
            <p>Detail belanja tidak dapat diubah.</p>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            {isLoading ? (
              <LoadingSpiner />
            ) : (
              <button className="btn btn-accent" onClick={handleSubmit}>
                Lanjut
              </button>
            )}
            <button className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
          </div>
        </div>
      </section>
    )
  );
};

export default Question;
