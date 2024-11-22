/** @format */

/**
 * eslint-disable @typescript-eslint/no-empty-object-type
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import VariantsTypes from "@/types/Variants";
// store variants
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  sortby?: string;
  order?: string;
  product_id?: number | string;
};

type Store = {
  dtVariants: {
    last_page: number;
    current_page: number;
    data: VariantsTypes[];
  };

  showVariants?: VariantsTypes;

  setVariants: ({
    page,
    limit,
    search,
    sortby,
    order,
    product_id,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setShowVariants: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  addData: (
    data: VariantsTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;

  removeData: (
    id: number | string
  ) => Promise<{ status: string; data?: any; error?: any }>;

  updateData: (
    id: number | string,
    data: VariantsTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useVariants = create(
  devtools<Store>((set) => ({
    dtVariants: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setVariants: async ({
      page = 1,
      limit = 10,
      search,
      sortby,
      order,
      product_id,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/variants`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
            product_id,
          },
        });
        set((state) => ({
          ...state,
          dtVariants: response.data.data,
        }));
        console.log({ response });
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    setShowVariants: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/variants/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({
          ...state,
          showVariants: response.data.data,
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    addData: async (row) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/variants`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: row,
        });
        set((prevState) => ({
          dtVariants: {
            last_page: prevState.dtVariants.last_page,
            current_page: prevState.dtVariants.current_page,
            data: [res.data.data, ...prevState.dtVariants.data],
          },
        }));
        return {
          status: "berhasil tambah",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "delete",
          url: `/variants/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtVariants: {
            last_page: prevState.dtVariants.last_page,
            current_page: prevState.dtVariants.current_page,
            data: prevState.dtVariants.data.filter(
              (item: any) => item.id !== id
            ),
          },
        }));
        return {
          status: "berhasil hapus",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "PUT",
          url: `/variants/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          data: row,
        });
        set((prevState) => ({
          dtVariants: {
            last_page: prevState.dtVariants.last_page,
            current_page: prevState.dtVariants.current_page,
            data: prevState.dtVariants.data.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...response.data.data,
                };
              } else {
                return item;
              }
            }),
          },
        }));
        return {
          status: "berhasil update",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useVariants;
