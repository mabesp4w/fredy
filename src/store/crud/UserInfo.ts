import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "../auth/login";
import UserInfosTypes from "@/types/UserInfos";
// store userInfos
type Props = {
    page?: number;
    limit?: number;
    search?: string;
    sortby?: string;
    order?: string;
};

type Store = {
    dtUserInfos: {
        last_page: number;
        current_page: number;
        data: UserInfosTypes[];
    };

    setUserInfos: ({ page, limit, search, sortby, order }: Props) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    setShowUserInfos: (id: number | string) => Promise<{
        status: string;
        data?: {};
        error?: {};
    }>;

    addData: (
        data: UserInfosTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;

    removeData: (
        id: number | string
    ) => Promise<{ status: string; data?: any; error?: any }>;

    updateData: (
        id: number | string,
        data: UserInfosTypes
    ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useUserInfos = create(
    devtools<Store>((set) => ({
        dtUserInfos: {
            last_page: 0,
            current_page: 0,
            data: [],
        },
        setUserInfos: async ({
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
                    url: `/userInfos`,
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
                    dtUserInfos: response.data,
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
        setShowUserInfos: async (id) => {
            try {
                const token = await useLogin.getState().setToken();
                const response = await crud({
                    method: "get",
                    url: `/userInfos/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((state) => ({
                    ...state,
                    dtUserInfos: response.data.data,
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
                    url: `/userInfos`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: row,
                });
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
                    url: `/userInfos/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                });
                set((prevState) => ({
                    dtUserInfos: {
                        last_page: prevState.dtUserInfos.last_page,
                        current_page: prevState.dtUserInfos.current_page,
                        data: prevState.dtUserInfos.data.filter(
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
                    url: `/userInfos/${id}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: row,
                });

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

export default useUserInfos;
