/** @format */

import showRupiah from "@/services/rupiah";
import React from "react";
import OrderProduct from "./OrderProduct";
import OrdersTypes from "@/types/Orders";

type Props = {
  order: OrdersTypes;
};

const History = ({ order }: Props) => {
  return (
    <div key={order.id} className="mb-10 border-b">
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
      <div className="">
        {/* rincian pembayaran */}
        <h1 className="text-center font-bold mb-4">
          Rincian pembayaran
          <hr />
        </h1>
        <div className="flex flex-col gap-y-2 w-full">
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
      </div>
    </div>
  );
};

export default History;
