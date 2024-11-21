/** @format */
"use client";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWelcomeContext } from "@/context/WelcomeContext";
import NavbarComp from "../navbar/NavbarComp";
import Image from "next/image";

const HeaderComp = () => {
  const { setIsOpen } = useMenuContext();
  const { setWelcome } = useWelcomeContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setWelcome("Selamat Datang di Halaman Admin");
    } else {
      // split the pathname
      const path = pathname?.split("/");
      setWelcome(`Halaman ${path[path.length - 1]}`);
    }

    return () => {};
  }, [pathname, setWelcome]);

  // ketika pathname berubah
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);
  // console.log({ isOpen });
  // const handleClick = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <main className="flex flex-col h-svh bg-dapoer-alea bg-cover bg-right text-secondary">
      {/* navbar */}
      <section className="flex justify-between items-center">
        <div className="absolute left-0 top-0 ">
          <Image
            alt="logo"
            src="/images/logo.png"
            className="mx-auto mb-3"
            width={300}
            height={100}
          />
        </div>
        <div className="w-full flex items-center justify-end">
          <NavbarComp />
        </div>
      </section>
    </main>
  );
};

export default HeaderComp;
