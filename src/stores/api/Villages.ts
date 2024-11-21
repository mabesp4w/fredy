/**
 * eslint-disable @typescript-eslint/no-empty-object-type
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import VillagesTypes from "@/types/Villages";
// api villages

type Store = {
  dtVillages: VillagesTypes[];
  setVillages: () => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useVillagesApi = create(
  devtools<Store>((set) => ({
    dtVillages: [],
    setVillages: async () => {
      try {
        const response = await api({
          method: "get",
          url: `/villages`,
        });
        set((state) => ({ ...state, dtVillages: response.data.data }));
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

export default useVillagesApi;
