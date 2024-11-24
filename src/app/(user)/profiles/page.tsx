/** @format */
"use client";
import useLogin from "@/stores/auth/login";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import Info from "./Info";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { cekToken, dtUser } = useLogin();
  useEffect(() => {
    setIsLoading(true);
    const second = async () => {
      const cek = await cekToken();
      if (cek?.error) {
        setIsLoggedIn(false);
      } else {
        console.log({ cek });
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    second();

    return () => {};
  }, [cekToken]);

  // Variants untuk animasi
  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  if (isLoading) {
    return (
      <section className="container flex justify-center items-center">
        <LoadingSpiner />
      </section>
    );
  }

  return (
    <section className="container">
      {isLoggedIn && (
        <div>
          <h1 className="text-accent font-bold text-2xl text-center">
            Informasi akun Anda
          </h1>
          <Info user={dtUser} />
        </div>
      )}
      {!isLoggedIn &&
        (showLogin ? (
          <div>
            <h2 className="text-center text-xl text-accent font-bold">
              Masukan email dan password untuk login
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-xl text-accent">
              Silahkan lengkapi data untuk mendaftar
            </h2>
          </div>
        ))}
      {!isLoggedIn && (
        <div className="w-[24rem] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={showLogin ? "login" : "register"} // Key yang bergantung pada state showLogin
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {showLogin ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Register setIsLoggedIn={setIsLoggedIn} />
              )}
              {showLogin ? (
                <div className="text-center">
                  <p className="text-sm">
                    Belum punya akun?{" "}
                    <span
                      className="text-neutral cursor-pointer"
                      onClick={() => setShowLogin(false)}
                    >
                      Daftar
                    </span>
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm">
                    Sudah punya akun?{" "}
                    <span
                      className="text-neutral cursor-pointer"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default Profile;
