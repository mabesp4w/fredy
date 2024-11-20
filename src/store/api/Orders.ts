import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import useLogin from "../auth/login";
import OrdersTypes from "@/types/Orders";
// api orders
type Props = {
    order_id?: string;
};

type Store = {
    dtOrders: OrdersTypes[];
    showOrder?: OrdersTypes;
    setOrders: () => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;
    setOrdersAll: (row: any) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;
    setShowOrders: (id: string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;
};

const token = async () => {
    return await useLogin.getState().setToken();
};

const useOrdersApi = create(
    devtools<Store>((set) => ({
        dtOrders: [],
        setOrders: async () => {
            try {
                const response = await api({
                    method: "get",
                    url: `/orders`,
                    headers: { Authorization: `Bearer ${await token()}` },
                });
                set((state) => ({ ...state, dtOrders: response.data }));
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
        setOrdersAll: async (row) => {
            try {
                const response = await api({
                    method: "get",
                    url: `/orders/all`,
                    headers: { Authorization: `Bearer ${await token()}` },
                    params: row,
                });
                set((state) => ({ ...state, dtOrders: response.data.data }));
                return {
                    status: "berhasil",
                    data: response.data,
                };
            } catch (error: any) {
                console.log({ error });
                return {
                    status: "error",
                    error: error.response.data,
                };
            }
        },
        setShowOrders: async (id) => {
            try {
                const response = await api({
                    method: "get",
                    url: `/orders/${id}`,
                });
                set((state) => ({
                    ...state,
                    showOrder: response.data.data,
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

export default useOrdersApi;
