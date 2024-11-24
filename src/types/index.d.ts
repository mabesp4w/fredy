/** @format */

import UserInfoTypes from "./UserInfos";

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string;
  user_info?: UserInfoTypes[];
}
