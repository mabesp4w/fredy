/** @format */

import MenuTypes from "@/types/MenuTypes";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { BsArrowDownShort, BsArrowRightShort } from "react-icons/bs";

type Props = {
  subMenus: MenuTypes[];
  addClass?: string;
};

const SubMenu: FC<Props> = ({ subMenus, addClass }) => {
  const pathname = usePathname();

  const [hoverIndex, setHoverIndex] = useState<null | number>(null);

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.ul
      className={`absolute flex flex-col bg-secondary shadow-lg rounded-lg z-50 ${
        addClass ? addClass : "-left-4 pt-4"
      }`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      {subMenus.map((item, index) => {
        const isActive = pathname === item.href;
        const isHovered = hoverIndex === index;

        return (
          <motion.li
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ delay: index * 0.1 }}
            className="relative capitalize text-nowrap"
          >
            <Link
              href={item.href || "#"}
              className={`flex items-center ${
                isActive ? "text-primary font-bold" : ""
              } block py-2 px-4 text-color-2 hover:text-primary hover:font-bold transition-colors duration-300 whitespace-nowrap text-[13px]`}
            >
              <span>{item.name}</span>
              {item.subMenus && (
                <span className="ml-2">
                  {isHovered ? <BsArrowDownShort /> : <BsArrowRightShort />}
                </span>
              )}
            </Link>
            {item.subMenus && (
              <AnimatePresence>
                {isHovered && (
                  <SubMenu
                    subMenus={item.subMenus}
                    addClass="left-full top-0"
                  />
                )}
              </AnimatePresence>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default SubMenu;
