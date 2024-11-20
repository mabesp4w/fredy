/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";
import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BtnDefault from "../button/BtnDefault";
import useLogout from "@/stores/auth/logout";
import MenuTypes from "@/types/MenuTypes";
import SubMenu from "./SubMenu";
import LoadingSpiner from "../loading/LoadingSpiner";
import handleLogout from "@/app/auth/logout/logout";
import Image from "next/image";
import { setAdminMenus } from "./ListMenu";
type Props = {
  type?: string;
};

const Sidebar: FC<Props> = ({ type = "admin" }) => {
  const pathname = usePathname();
  const route = useRouter();
  const [menus, setMenus] = useState<MenuTypes[]>([]);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [loadLogout, setLoadLogout] = useState(false);
  // store
  const { setLogout } = useLogout();

  const getMenuDynamic = useCallback(async () => {
    let res: MenuTypes[] = [];
    if (type === "admin") {
      res = await setAdminMenus();
    }
    setMenus(res);
  }, [type]);

  useEffect(() => {
    getMenuDynamic();
  }, [getMenuDynamic]);

  // submenu
  const findOpenMenus = (menuList: MenuTypes[]) => {
    for (const menu of menuList) {
      // console.log({ slug, menu });
      if (menu?.href === pathname) {
        const second = pathname?.split("/");
        // if second.length > 0 remove index 0
        second.splice(0, 1);
        setOpenMenus(second);
      }
      // console.log({ menu });
      if (menu.subMenus) {
        // console.log({ menu });
        findOpenMenus(menu.subMenus);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    menus && findOpenMenus(menus);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus, pathname]);

  return (
    <>
      <aside
        className={`z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="sidebar z-50 h-full px-3 pt-4 overflow-y-auto text-third flex flex-row-reverse justify-between sm:block">
          <div className="flex flex-col gap-4 h-full sidebar w-full overflow-hidden">
            <div className="h-24 sidebar">
              <Image
                alt="logo"
                src="/images/katada.png"
                className="mx-auto mb-3"
                width={80}
                height={80}
              />
            </div>
            <ul className="space-y-2 grow w-full h-full overflow-auto scrollbar list-none p-0">
              {menus &&
                menus.map((menu, index) => {
                  const isActive = pathname === menu.href;
                  const subMenus = menu?.subMenus;
                  const { name, icon, slug } = menu;
                  const truncatedName =
                    name.length > 10 ? name.slice(0, 10) + "..." : name;

                  return subMenus ? (
                    SubMenu({
                      subMenus,
                      name,
                      truncatedName,
                      icon,
                      slug,
                      index,
                      pathname,
                      openMenus,
                    })
                  ) : (
                    <li key={index}>
                      <Link
                        href={menu.href || "#"}
                        className={`flex w-full items-center p-2 text-color-2 hover:text-fifth hover:font-normal transition-all duration-300 rounded-lg group ${
                          isActive && "bg-my-orange text-fifth font-bold"
                        }`}
                        title={name}
                      >
                        {icon}
                        <span className="ms-3">{truncatedName}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            {loadLogout ? (
              <LoadingSpiner />
            ) : (
              <div className="flex justify-center">
                <BtnDefault
                  addClass="bg-secondary text-fourth"
                  onClick={() =>
                    handleLogout({ setLogout, setLoadLogout, route })
                  }
                >
                  Logout
                </BtnDefault>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
