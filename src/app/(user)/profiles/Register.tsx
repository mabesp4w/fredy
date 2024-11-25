/** @format */

import InputTextDefault from "@/components/input/InputTextDefault";
import InputTextPassword from "@/components/input/InputTextPassword";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useLogin from "@/stores/auth/login";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const Register = ({ setIsLoggedIn }: Props) => {
  // store
  const { setRegister, cekToken } = useLogin();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registrationSchema = Yup.object().shape({
    name: Yup.string().required("Nama tidak boleh kosong"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email tidak boleh kosong"),
    password: Yup.string()
      .min(6, "Password minimal 6 karakter")
      .required("Password tidak boleh kosong"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Password tidak sama")
      .required("Password tidak boleh kosong"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (row) => {
    setIsLoading(true);
    setError("");
    const res = await setRegister(row);
    if (res?.error) {
      console.log(res?.error);
      setError(res?.error?.message);
    } else {
      const { data } = res;
      console.log({ data });
      const { role, token } = data;
      Cookies.set("token", token);
      Cookies.set("role", role);
      setIsLoggedIn(true);
      router.push(`/profiles`);
    }
    await cekToken();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  console.log({ errors });
  return (
    <section>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form action="">
        <div className="pb-2 pt-4">
          <InputTextDefault
            label="Nama"
            register={register}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="pb-2 pt-4">
          <InputTextDefault
            label="Email"
            register={register}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
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
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="pb-2 pt-4">
          <InputTextPassword
            name="password_confirmation"
            label="Ulagi Password"
            placeholder="Password"
            register={register}
            required
            errors={errors.password}
          />
          {errors.password_confirmation && (
            <p className="text-red-600">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
        <div className="mt-5">
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <button
              type="submit"
              className="transition duration-200 bg-primary hover:bg-primary/80 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              onClick={handleSubmit(onSubmit)}
            >
              <span className="inline-block mr-2">Daftar</span>
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Register;
