import UserInfoTypes from "./UserInfos";

export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at?: string;
    user_info?: UserInfoTypes[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
