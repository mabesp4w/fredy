import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import ShippingCostsTypes from "@/types/ShippingCosts";
// store shippingCosts
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtShippingCosts: {
        last_page: number;
        current_page: number;
        data: ShippingCostsTypes[];
    };

    setShippingCosts: ({
        page,
        limit,
        search,
        sortby,
        order,
    }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowShippingCosts: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: ShippingCostsTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: ShippingCostsTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useShippingCosts = create(
    devtools<Store>((set) => ({
        dtShippingCosts: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setShippingCosts: async ({
            page = 1,
            limit = 10,
            search,
            sortby,
            order,
        }) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/shippingCosts`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        limit,
                        page,
                        search,
                        sortby,
                        order,
                    },
                });
                set((state) => ({
                    ...state,
                    dtShippingCosts: response.data,
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
        setShowShippingCosts: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/shippingCosts/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtShippingCosts: response.data.data,
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
                    url: `/shippingCosts`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtShippingCosts: {
                        last_page: prevState.dtShippingCosts.last_page,
                        current_page: prevState.dtShippingCosts.current_page,
                        data: [
                            res.data.data,
                            ...prevState.dtShippingCosts.data,
                        ],
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
                    url: `/shippingCosts/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtShippingCosts: {
                        last_page: prevState.dtShippingCosts.last_page,
                        current_page: prevState.dtShippingCosts.current_page,
                        data: prevState.dtShippingCosts.data.filter(
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
                    url: `/shippingCosts/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtShippingCosts: {
                        last_page: prevState.dtShippingCosts.last_page,
                        current_page: prevState.dtShippingCosts.current_page,
                        data: prevState.dtShippingCosts.data.map(
                            (item: any) => {
                                if (item.id === id) {
                                    return {
                                        ...item,
                                        ...response.data.data,
                                    };
                                } else {
                                    return item;
                                }
                            }
                        ),
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

export default useShippingCosts;
