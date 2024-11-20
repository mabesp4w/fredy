/** @format */
import MenuTypes from "@/types/MenuTypes";
import { BsActivity, BsHouseDoor, BsNewspaper, BsPerson } from "react-icons/bs";
const createUrl = (path: string) => `${path}`;

const setUsersMenus = async () => {
  const ListMenu: MenuTypes[] = [
    {
      name: "Home",
      href: createUrl("/dashboard"),
      icon: <BsHouseDoor />,
    },
    {
      name: "Women",
      href: createUrl("/announcements"),
      icon: <BsActivity />,
    },
    {
      name: "Shop",
      slug: "shop",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Product",
          href: createUrl("/shop/photos"),
        },
        {
          name: "Cart",
          href: createUrl("/shop/videos"),
        },
      ],
    },

    {
      name: "Galeri",
      slug: "galleries",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Foto",
          href: createUrl("/galleries/photos"),
        },
        {
          name: "Vidio",
          href: createUrl("/galleries/videos"),
        },
      ],
    },
    {
      name: "Man",
      href: createUrl("/news"),
      icon: <BsNewspaper />,
    },
  ];

  return ListMenu;
};

export { setUsersMenus };
