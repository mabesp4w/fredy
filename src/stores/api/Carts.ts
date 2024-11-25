/**
 * eslint-disable @typescript-eslint/no-empty-object-type
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import useLogin from "../auth/login";
import CartsTypes from "@/types/Carts";
// api carts
type Props = {
  product_variant_id?: string;
  quantity?: number;
  user_id?: string;
  costumQuantity?: boolean;
};

type Store = {
  dtCarts: {
    last_page: number;
    current_page: number;
    data: CartsTypes[];
  };
  setCarts: ({ user_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  addCart: ({
    product_variant_id,
    quantity,
    costumQuantity,
    user_id,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  removeCarts: ({ user_id, product_variant_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const token = async () => {
  return await useLogin.getState().setToken();
};

const useCartsApi = create(
  devtools<Store>((set) => ({
    dtCarts: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setCarts: async ({ user_id }) => {
      try {
        const response = await api({
          method: "get",
          url: `/carts`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            user_id,
          },
        });
        set((state) => ({ ...state, dtCarts: response.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    addCart: async ({
      product_variant_id,
      quantity = 1,
      costumQuantity,
      user_id,
    }) => {
      let endpoint = "";
      if (costumQuantity) {
        endpoint = "/carts/setCartQuantity";
      } else {
        endpoint = "/carts/addToCartDatabase";
      }
      try {
        const response = await api({
          method: "POST",
          url: endpoint,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            product_variant_id,
            quantity,
            user_id,
          },
        });
        // call set cart
        useCartsApi.getState().setCarts({ user_id });
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    removeCarts: async ({ user_id, product_variant_id }) => {
      try {
        const response = await api({
          method: "post",
          url: `/carts/removeFromCartDatabase`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            user_id,
            product_variant_id,
          },
        });
        //   call set cart
        useCartsApi.getState().setCarts({ user_id });
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useCartsApi;
