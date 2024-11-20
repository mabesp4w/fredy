/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
import UserTypes from "@/types/UserTypes";
// store user

type Store = {
  dtUser: UserTypes;

  setShowUser: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useUserAPI = create(
  devtools<Store>((set) => ({
    dtUser: {
      id: "",
      name: "",
      email: "",
      role: "",
      show_password: "",
      created_at: "",
      updated_at: "",
    },
    setShowUser: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await api({
          method: "get",
          url: `/user/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, dtUser: response.data.data }));
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
  }))
);

export default useUserAPI;
