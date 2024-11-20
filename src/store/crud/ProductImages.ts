import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import ProductImagesTypes from "@/types/ProductImages";
// store productImages
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
    product_id?: number | string;
};

type Store = {
    dtProductImages: {
        last_page: number;
        current_page: number;
        data: ProductImagesTypes[];
    };

    setProductImages: ({
        page,
        limit,
        search,
        sortby,
        order,
        product_id,
    }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowProductImages: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: ProductImagesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: ProductImagesTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useProductImages = create(
    devtools<Store>((set) => ({
        dtProductImages: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setProductImages: async ({
            page = 1,
            limit = 10,
            search,
            sortby,
            order,
            product_id,
        }) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/productImages`,
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        limit,
                        page,
                        search,
                        sortby,
                        order,
                        product_id,
                    },
                });
                set((state) => ({ ...state, dtProductImages: response.data }));
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
        setShowProductImages: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/productImages/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtProductImages: response.data.data,
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
                    url: `/productImages`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    data: row,
                });
                console.log({ res });
                set((prevState) => ({
                    dtProductImages: {
                        last_page: prevState.dtProductImages.last_page,
                        current_page: prevState.dtProductImages.current_page,
                        data: res.data.data,
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
                    url: `/productImages/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtProductImages: {
                        last_page: prevState.dtProductImages.last_page,
                        current_page: prevState.dtProductImages.current_page,
                        data: prevState.dtProductImages.data.filter(
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
                    url: `/productImages/${id}?_method=PUT`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    data: row,
                });
                set((prevState) => ({
                    dtProductImages: {
                        last_page: prevState.dtProductImages.last_page,
                        current_page: prevState.dtProductImages.current_page,
                        data: prevState.dtProductImages.data.map(
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

export default useProductImages;
