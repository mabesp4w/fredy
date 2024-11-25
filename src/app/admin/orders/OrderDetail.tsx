/** @format */

import OrderProduct from "@/app/(user)/orders/OrderProduct";
import ModalDefault from "@/components/modal/ModalDefault";
import OrdersTypes from "@/types/Orders";
import React from "react";

type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  order?: OrdersTypes;
};

const OrderDetail = ({ showModal, setShowModal, order }: Props) => {
  console.log({ order });
  return (
    <ModalDefault
      title={`Detail Order`}
      showModal={showModal}
      setShowModal={setShowModal}
      width="md:w-[50rem] lg:w-[65rem]"
    >
      <div className="flex justify-center items-center flex-col">
        <p className="capitalize font-bold mb-4">
          {order?.shipping_status?.status}
        </p>
        <div>
          {order?.order_items.map((item) => (
            <OrderProduct
              product_variant={item.product_variant}
              quantity={item.quantity}
              key={item.id}
            />
          ))}
        </div>
        <div className="self-start mt-4">
          <table>
            <tbody>
              <tr>
                <td valign="top">Kecamatan-Kelurahan</td>
                <td valign="top">:</td>
                <td valign="top">
                  {order?.shipping_cost.sub_district.sub_district_nm}-
                  {order?.shipping_cost.village_nm}
                </td>
              </tr>
              <tr>
                <td valign="top">Alamat</td>
                <td valign="top">:</td>
                <td valign="top">{order?.address}</td>
              </tr>
              <tr>
                <td valign="top">No. HP</td>
                <td valign="top">:</td>
                <td valign="top">
                  {order?.user?.user_info &&
                    order?.user?.user_info[0]?.phone_number}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModalDefault>
  );
};

export default OrderDetail;
