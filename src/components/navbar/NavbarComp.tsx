/** @format */

"use client";
import { FC, useEffect, useState } from "react";
import MenuItem from "./MenuItems";
import MenuTypes from "@/types/MenuTypes";
import { setUsersMenus } from "./ListMenu";
import { usePathname } from "next/navigation";
import { BsPerson } from "react-icons/bs";
import { IoBag } from "react-icons/io5";

const NavbarComp: FC = () => {
  const [menus, setMenus] = useState<MenuTypes[]>([]);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);

  const pathname = usePathname();

  const getMenuDynamic = async () => {
    const res = await setUsersMenus();
    setMenus(res);
  };

  useEffect(() => {
    getMenuDynamic();
  }, []);

  return (
    <div className="flex items-center gap-3 px-5 py-2">
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
        <button className="bg-muted rounded-full px-5 py-2 text-sm font-bold hover:text-primary">
          <BsPerson />
        </button>
        <button className="flex gap-2 items-center rounded-fullpx-5 py-2">
          <IoBag />
          <span className="font-bold">Rp. 0</span>
        </button>
      </div>
    </div>
  );
};

export default NavbarComp;
