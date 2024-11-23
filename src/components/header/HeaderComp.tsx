/** @format */
"use client";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWelcomeContext } from "@/context/WelcomeContext";
import NavbarComp from "../navbar/NavbarComp";

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
    <main className="flex flex-col text-secondary">
      {/* navbar */}
      <NavbarComp />
    </main>
  );
};

export default HeaderComp;
