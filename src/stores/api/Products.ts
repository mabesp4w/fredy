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
import ProductsTypes from "@/types/Products";
// api products
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  product_id?: string;
};

type Store = {
  dtProducts: {
    last_page: number;
    current_page: number;
    data: ProductsTypes[];
  };

  showProduct?: ProductsTypes;

  setProducts: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setProductsWithParams: ({
    page,
    limit,
    search,
    category_id,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setProductsWelcome: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  dtProductWelcome?: {
    bestSellers: ProductsTypes[];
    newProduct: ProductsTypes[];
  };
  setShowProducts: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  getProductIds: (ids: any) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const token = async () => {
  return await useLogin.getState().setToken();
};

const useProductsApi = create(
  devtools<Store>((set) => ({
    dtProducts: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setProducts: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/products`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtProducts: response.data }));
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
    setProductsWithParams: async ({
      page = 1,
      limit = 10,
      search,
      category_id,
    }) => {
      try {
        const response = await api({
          method: "get",
          url: `/products/category/${category_id}`,
          headers: { Authorization: `Bearer ${await token()}` },
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtProducts: response.data.data }));
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
    setProductsWelcome: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/products/welcome`,
        });
        set((state) => ({ ...state, dtProductWelcome: response.data.data }));
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
    setShowProducts: async (id) => {
      try {
        const response = await api({
          method: "get",
          url: `/products/detail/${id}`,
          headers: { Authorization: `Bearer ${await token()}` },
        });
        set((state) => ({ ...state, showProduct: response.data.data }));
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
    getProductIds: async (cart) => {
      try {
        const response = await api({
          method: "get",
          url: `/products/getProductIds`,
          params: {
            ids: cart,
          },
          headers: { Authorization: `Bearer ${await token()}` },
        });
        set((state) => ({ ...state, dtProducts: response.data }));
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

export default useProductsApi;
