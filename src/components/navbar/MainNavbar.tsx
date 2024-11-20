/** @format */

"use client";
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import MenuTypes from "@/types/MenuTypes";
import { MainMenu } from "./ListMenu";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoYoutube,
} from "react-icons/bi";

const MainNavbar: FC = ({}) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between w-full gap-x-80 text-sm">
      <ul className="flex gap-x-4 overflow-auto grow justify-start">
        {MainMenu.map((item: MenuTypes, index: number) => {
          const isActive = pathname === item.href;
          return (
            <li key={index}>
              <Link
                href={item.href || "#"}
                className={`${
                  isActive && "underline font-bold"
                } block py-1 text-color-2 rounded-full hover:underline hover:font-bold transition-colors duration-300 uppercase`}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-x-4 overflow-auto grow justify-end">
        <li className="py-1 text-color-2 rounded-full">
          <div className=" flex gap-2 items-center">
            <span className="font-semibold">Folow Us :</span>
            <div className="flex gap-1 text-slate-300">
              <Link href="https://www.facebook.com/" target="_blank">
                <BiLogoFacebook className="hover:text-slate-50 cursor-pointer" />
              </Link>
              <Link href="https://www.facebook.com/" target="_blank">
                <BiLogoInstagram className="hover:text-slate-50 cursor-pointer" />
              </Link>
              <Link
                href="https://www.youtube.com/@SMAYPPKTARUNADHARMAJAYAPURA"
                target="_blank"
              >
                <BiLogoYoutube className="hover:text-slate-50 cursor-pointer" />
              </Link>
              <Link href="https://www.facebook.com/" target="_blank">
                <BiLogoTiktok className="hover:text-slate-50 cursor-pointer" />
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MainNavbar;
