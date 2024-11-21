/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import useLogin from "@/stores/auth/login";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import InputTextPassword from "@/components/input/InputTextPassword";
import BtnDefault from "@/components/button/BtnDefault";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  // store
  const { setLogin, cekToken } = useLogin();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // jika sudah login
  const fetchAuth = useCallback(async () => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (token) {
      const cekAuth = await cekToken();
      // if role not admin then logout
      if (role !== "admin") {
        return router.push("/auth/login");
      }
      // console.log({ cekAuth });
      if (!cekAuth?.error) {
        router.push(`/roles/${role}/dashboard`);
      }
    }
    setIsLoading(false);
  }, [cekToken, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchAuth();
    }
  }, [fetchAuth]);

  const onSubmit: SubmitHandler<Inputs> = async (row) => {
    setIsLoading(true);
    setError("");
    const res = await setLogin(row);
    if (res?.error) {
      console.log(res?.error);
      setError(res?.error?.message);
    } else {
      const { data } = res;
      const token = data.token;
      const role = data.role;
      const user = data.user;
      // set cookie
      Cookies.set("token", token);
      Cookies.set("role", role);
      Cookies.set("user", JSON.stringify(user));
      router.push(`/roles/${role}/dashboard`);
    }
    setIsLoading(false);
  };

  return (
    <div className="px-5 py-7">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form action="">
        <div className="pb-2 pt-4">
          <InputTextDefault
            label="Email"
            register={register}
            type="text"
            name="email"
            placeholder="Email"
            required
            errors={errors.email}
          />
        </div>
        <div className="pb-2 pt-4">
          <InputTextPassword
            name="password"
            label="Password"
            placeholder="Password"
            register={register}
            required
            errors={errors.password}
          />
        </div>
        <div className="mt-5">
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <BtnDefault onClick={handleSubmit(onSubmit)} type="submit">
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </BtnDefault>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
