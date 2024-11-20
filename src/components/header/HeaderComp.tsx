/** @format */
"use client";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWelcomeContext } from "@/context/WelcomeContext";
import Link from "next/link";
import NavbarComp from "../navbar/NavbarComp";
import { BsCart4, BsHandbag, BsSearch } from "react-icons/bs";

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
    <main className="flex flex-col">
      <section className="flex justify-between items-center border-b px-4 h-11">
        {/* menu */}
        <ul className="flex gap-3 text-sm">
          <li>Tentang Kami</li>
          <li>Akun</li>
          <li>Checkout</li>
        </ul>
        {/* call */}
        <span>Butuh bantuan? Telp. Kami: 08123456789</span>
      </section>
      <section className="px-4 h-24 flex justify-between items-center">
        {/* brand */}
        <div className="flex gap-1 text-2xl">
          <span>
            <BsCart4 />
          </span>
          <span className="font-amsterdam-one text-3xl">Dapoer Alea</span>
        </div>
        {/* search */}
        <div>
          {/* category */}
          {/* input */}
          <div className="flex items-center border rounded-full p-1">
            <input
              className="border-none focus-visible:ring-0 outline-none mx-2"
              placeholder="Cari Produk atau Kategori"
            />
            <button className="rounded-full shadow-none flex gap-2 items-center">
              <span>CARI</span>
              <span>
                <BsSearch />
              </span>
            </button>
          </div>
        </div>
        {/* login & cart */}
        <div className="lg:flex items-center gap-3 hidden">
          <Link
            href="#"
            className="bg-muted rounded-full px-5 py-2 text-sm font-bold hover:text-primary"
          >
            Login / Mendaftar
          </Link>
          <Link
            href="#"
            className="flex gap-2 items-center bg-primary rounded-full text-white px-5 py-2"
          >
            <BsHandbag />
            <span className="font-bold">Rp. 0</span>
          </Link>
        </div>
      </section>
      {/* navbar */}
      <section className="bg-primary h-14 flex justify-between items-center">
        <NavbarComp />
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="#"
            className="bg-muted rounded-full px-5 py-2 text-sm font-bold hover:text-primary"
          >
            Login / Mendaftar
          </Link>
          <Link
            href="#"
            className="flex gap-2 items-center bg-primary rounded-full text-white px-5 py-2"
          >
            <BsHandbag />
            <span className="font-bold">Rp. 0</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HeaderComp;
