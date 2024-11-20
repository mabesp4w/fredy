import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import ShippingStatusTypes from "@/types/ShippingStatuses";
// store shippingStatuses
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtShippingStatuses: {
        last_page: number;
        current_page: number;
        data: ShippingStatusTypes[];
    };

    setShippingStatuses: ({
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

    setShowShippingStatuses: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: ShippingStatusTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: ShippingStatusTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useShippingStatuses = create(
    devtools<Store>((set) => ({
        dtShippingStatuses: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setShippingStatuses: async ({
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
                    url: `/shippingStatuses`,
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
                    dtShippingStatuses: response.data,
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
        setShowShippingStatuses: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/shippingStatuses/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtShippingStatuses: response.data.data,
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
                    url: `/shippingStatuses`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtShippingStatuses: {
                        last_page: prevState.dtShippingStatuses.last_page,
                        current_page: prevState.dtShippingStatuses.current_page,
                        data: [
                            res.data.data,
                            ...prevState.dtShippingStatuses.data,
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
                    url: `/shippingStatuses/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtShippingStatuses: {
                        last_page: prevState.dtShippingStatuses.last_page,
                        current_page: prevState.dtShippingStatuses.current_page,
                        data: prevState.dtShippingStatuses.data.filter(
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
                    url: `/shippingStatuses/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtShippingStatuses: {
                        last_page: prevState.dtShippingStatuses.last_page,
                        current_page: prevState.dtShippingStatuses.current_page,
                        data: prevState.dtShippingStatuses.data.map(
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

export default useShippingStatuses;
