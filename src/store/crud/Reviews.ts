import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import ReviewsTypes from "@/types/Reviews";
// store reviews
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtReviews: ReviewsTypes[];

    setReviews: ({ page, limit, search, sortby, order }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowReviews: (id: number | string) => Promise<{
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
        data: ReviewsTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useReviews = create(
    devtools<Store>((set) => ({
        dtReviews: [],
        setReviews: async ({ page = 1, limit = 10, search, sortby, order }) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/reviews`,
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
                    dtReviews: response.data,
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
        setShowReviews: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/reviews/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtReviews: response.data.data,
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
                    url: `/reviews`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
                console.log({ res });
                set((prevState) => ({
                    dtReviews: [res.data.data, ...prevState.dtReviews],
                }));
                return {
                    status: res.data.type,
                    data: res.data,
                };
            } catch (error: any) {
                return {
                    status: "error",
                    data: error.response,
                };
            }
        },
        removeData: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const res = await crud({
                    method: "delete",
                    url: `/reviews/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtReviews: prevState.dtReviews.filter(
                        (item: any) => item.id !== id
                    ),
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
                    url: `/reviews/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });
                set((prevState) => ({
                    dtReviews: prevState.dtReviews.map((item: any) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                ...response.data.data,
                            };
                        } else {
                            return item;
                        }
                    }),
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

export default useReviews;
