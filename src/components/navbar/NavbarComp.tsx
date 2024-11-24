/** @format */

"use client";
import { FC, useEffect, useState } from "react";
import MenuItem from "./MenuItems";
import MenuTypes from "@/types/MenuTypes";
import { setUsersMenus } from "./ListMenu";
import { usePathname } from "next/navigation";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";
import Cart from "../shop/Cart";

const NavbarComp: FC = () => {
  const [menus, setMenus] = useState<MenuTypes[]>([]);
  const [isHome, setIsHome] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);

  const pathname = usePathname();

  const getMenuDynamic = async () => {
    const res = await setUsersMenus();
    setMenus(res);
  };

  useEffect(() => {
    getMenuDynamic();
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [pathname]);

  return (
    <div
      className={`flex justify-end items-center gap-3 px-5 py-2 z-50 backdrop-blur-sm w-full ${
        !isHome && "bg-primary"
      }`}
    >
      <div className="flex items-center justify-between gap-8">
        <div className="relative capitalize font-bold h-full">
          <ul className="flex gap-x-10 whitespace-nowrap items-center h-full">
            {menus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                index={index}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                pathname={pathname}
                addClass={
                  index === 0
                    ? "justify-self-start"
                    : index === menus.length - 1
                    ? "justify-self-end"
                    : "justify-self-center"
                }
              />
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3 w-full">
          <div className="dropdown dropdown-end">
            <BsPerson tabIndex={0} role="button" />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 mt-4 rounded-box z-[1] w-52 p-2 shadow text-black"
            >
              <li>
                <Link href={"/profiles"}>Akun</Link>
              </li>
              <li>
                <Link href={"/orders"}>Pesanan</Link>
              </li>
            </ul>
          </div>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default NavbarComp;
