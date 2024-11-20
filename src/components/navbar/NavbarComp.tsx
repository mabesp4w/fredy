/** @format */

"use client";
import { FC, useEffect, useState } from "react";
import MenuItem from "./MenuItems";
import MenuTypes from "@/types/MenuTypes";
import { setUsersMenus } from "./ListMenu";
import { usePathname } from "next/navigation";

const NavbarComp: FC = ({}) => {
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
    <div className="relative uppercase text-white h-full mx-4">
      <ul className="flex gap-x-4 whitespace-nowrap justify-between items-center h-full">
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
  );
};

export default NavbarComp;
