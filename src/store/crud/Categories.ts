import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import CategoriesTypes from "@/types/Categories";
// store categories
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtCategories: {
        last_page: number;
        current_page: number;
        data: CategoriesTypes[];
    };

    setCategories: ({ page, limit, search, sortby, order }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowCategories: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: CategoriesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: CategoriesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useCategories = create(
    devtools<Store>((set) => ({
        dtCategories: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setCategories: async ({
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
                    url: `/categories`,
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
                    dtCategories: response.data,
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
        setShowCategories: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/categories/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
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
                    error: error.response?.data,
                };
            }
        },
        addData: async (row) => {
            try {
                const token = await useLogin.getState().setToken();
                const res = await crud({
                    method: "post",
                    url: `/categories`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtCategories: {
                        last_page: prevState.dtCategories.last_page,
                        current_page: prevState.dtCategories.current_page,
                        data: [res.data.data, ...prevState.dtCategories.data],
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
                    url: `/categories/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtCategories: {
                        last_page: prevState.dtCategories.last_page,
                        current_page: prevState.dtCategories.current_page,
                        data: prevState.dtCategories.data.filter(
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
                    url: `/categories/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtCategories: {
                        last_page: prevState.dtCategories.last_page,
                        current_page: prevState.dtCategories.current_page,
                        data: prevState.dtCategories.data.map((item: any) => {
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

export default useCategories;
