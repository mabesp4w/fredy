/** @format */
"use client";
import useLogin from "@/stores/auth/login";
import React, { useEffect, useState } from "react";
import Login from "./Login";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cekToken } = useLogin();
  useEffect(() => {
    const second = async () => {
      const cek = await cekToken();
      if (cek?.error) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    second();

    return () => {};
  }, [cekToken]);

  return (
    <section className="container">
      {isLoggedIn && <div className="text-center">Selamat Datang</div>}
      {!isLoggedIn && <Login />}
    </section>
  );
};

export default Profile;
