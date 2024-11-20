import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import useLogin from "../auth/login";
import CartsTypes from "@/types/Carts";
// api carts
type Props = {
    product_id: string;
    quantity: number;
};

type Store = {
    dtCarts: {
        last_page: number;
        current_page: number;
        data: CartsTypes[];
    };
    setCarts: () => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;
    addToCartSession: ({ product_id, quantity }: Props) => Promise<{
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
        setCarts: async () => {
            try {
                const response = await api({
                    method: "get",
                    url: `/carts/getCartData`,
                    headers: { Authorization: `Bearer ${await token()}` },
                });
                console.log({ response });
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
        addToCartSession: async ({ product_id, quantity }) => {
            try {
                const response = await api({
                    method: "get",
                    url: `/carts/getCartData`,
                    headers: { Authorization: `Bearer ${await token()}` },
                    params: {
                        product_id,
                        quantity,
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
    }))
);

export default useCartsApi;
