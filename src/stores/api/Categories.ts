/**
 * eslint-disable @typescript-eslint/no-empty-object-type
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import CategoriesTypes from "@/types/Categories";
// api categories

type Store = {
  dtCategories: CategoriesTypes[];
  showCategory?: CategoriesTypes;
  setCategories: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowCategories: (id: string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useCategoriesApi = create(
  devtools<Store>((set) => ({
    dtCategories: [],
    setCategories: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/categories`,
        });
        set((state) => ({
          ...state,
          dtCategories: response.data.data,
        }));
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
    setShowCategories: async (id) => {
      try {
        const response = await api({
          method: "get",
          url: `/categories/${id}`,
        });
        set((state) => ({
          ...state,
          showCategory: response.data.data,
        }));
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

export default useCategoriesApi;
