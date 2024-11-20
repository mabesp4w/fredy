import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import OrdersTypes from "@/types/Orders";
// store orders
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
    status?: string;
};

type Store = {
    dtOrders: {
        last_page: number;
        current_page: number;
        data: OrdersTypes[];
    };

    setOrders: ({
        page,
        limit,
        search,
        sortby,
        order,
        status,
    }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowOrders: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: any
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: OrdersTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useOrders = create(
    devtools<Store>((set) => ({
        dtOrders: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setOrders: async ({
            page = 1,
            limit = 10,
            search,
            sortby,
            order,
            status,
        }) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/orders`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        limit,
                        page,
                        search,
                        sortby,
                        order,
                        status,
                    },
                });
                set((state) => ({
                    ...state,
                    dtOrders: response.data,
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
        setShowOrders: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/orders/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtOrders: response.data.data,
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
                    url: `/orders`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtOrders: {
                        last_page: prevState.dtOrders.last_page,
                        current_page: prevState.dtOrders.current_page,
                        data: [res.data.data, ...prevState.dtOrders.data],
                    },
                }));
                return {
                    status: res.data.type,
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
                    url: `/orders/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtOrders: {
                        last_page: prevState.dtOrders.last_page,
                        current_page: prevState.dtOrders.current_page,
                        data: prevState.dtOrders.data.filter(
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
                    url: `/orders/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtOrders: {
                        last_page: prevState.dtOrders.last_page,
                        current_page: prevState.dtOrders.current_page,
                        data: prevState.dtOrders.data.map((item: any) => {
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

export default useOrders;
