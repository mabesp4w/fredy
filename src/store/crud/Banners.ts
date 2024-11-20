import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import BannersTypes from "@/types/Banners";
// store banners
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtBanners: {
        last_page: number;
        current_page: number;
        data: BannersTypes[];
    };

    setBanners: ({ page, limit, search, sortby, order }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowBanners: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: BannersTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: BannersTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useBanners = create(
    devtools<Store>((set) => ({
        dtBanners: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setBanners: async ({ page = 1, limit = 10, search, sortby, order }) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/banners`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        limit,
                        page,
                        search,
                        sortby,
                        order,
                    },
                });
                set((state) => ({ ...state, dtBanners: response.data }));
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
        setShowBanners: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/banners/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({ ...state, dtBanners: response.data.data }));
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
                    url: `/banners`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtBanners: {
                        last_page: prevState.dtBanners.last_page,
                        current_page: prevState.dtBanners.current_page,
                        data: [res.data.data, ...prevState.dtBanners.data],
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
                    url: `/banners/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtBanners: {
                        last_page: prevState.dtBanners.last_page,
                        current_page: prevState.dtBanners.current_page,
                        data: prevState.dtBanners.data.filter(
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
                    method: "POST",
                    url: `/banners/${id}?_method=PUT`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtBanners: {
                        last_page: prevState.dtBanners.last_page,
                        current_page: prevState.dtBanners.current_page,
                        data: prevState.dtBanners.data.map((item: any) => {
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

export default useBanners;
