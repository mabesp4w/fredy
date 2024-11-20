import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import SubCategoriesTypes from "@/types/SubCategories";
// store subCategories
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtSubCategories: {
        last_page: number;
        current_page: number;
        data: SubCategoriesTypes[];
    };

    setSubCategories: ({
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

    setShowSubCategories: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: SubCategoriesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: SubCategoriesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useSubCategories = create(
    devtools<Store>((set) => ({
        dtSubCategories: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setSubCategories: async ({
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
                    url: `/subCategories`,
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
                    dtSubCategories: response.data,
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
        setShowSubCategories: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/subCategories/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtSubCategories: response.data.data,
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
                    url: `/subCategories`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtSubCategories: {
                        last_page: prevState.dtSubCategories.last_page,
                        current_page: prevState.dtSubCategories.current_page,
                        data: [
                            res.data.data,
                            ...prevState.dtSubCategories.data,
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
                    url: `/subCategories/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtSubCategories: {
                        last_page: prevState.dtSubCategories.last_page,
                        current_page: prevState.dtSubCategories.current_page,
                        data: prevState.dtSubCategories.data.filter(
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
                    url: `/subCategories/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtSubCategories: {
                        last_page: prevState.dtSubCategories.last_page,
                        current_page: prevState.dtSubCategories.current_page,
                        data: prevState.dtSubCategories.data.map(
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

export default useSubCategories;
