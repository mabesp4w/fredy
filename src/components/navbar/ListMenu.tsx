/** @format */
import { BASE_URL } from "@/services/baseURL";
import CategoriesTypes from "@/types/Categories";
import MenuTypes from "@/types/MenuTypes";
import axios from "axios";
import { BsHouseDoor, BsNewspaper, BsPerson } from "react-icons/bs";
const createUrl = (path: string) => `${path}`;

const setUsersMenus = async () => {
  // fetch categories from api axios
  const res = await axios.get(`${BASE_URL}/api/categories/all`);
  const categories = res.data.data;

  const ListMenu: MenuTypes[] = [
    {
      name: "Home",
      href: createUrl("/"),
      icon: <BsHouseDoor />,
    },

    {
      name: "Menu Makan",
      slug: "menus",
      icon: <BsPerson />,
      subMenus: [],
    },
    {
      name: "Galeri",
      href: createUrl("/galleries"),
      icon: <BsNewspaper />,
    },
    {
      name: "Tentang Kami",
      href: createUrl("/news"),
      icon: <BsNewspaper />,
    },
  ];

  // Cari indeks dari item menu "Menu"
  const menuIndex = ListMenu.findIndex((menu) => menu.slug === "menus");
  if (menuIndex !== -1) {
    // Tambahkan setiap kategori ke dalam subMenus dari item menu "Menu"
    categories.forEach((category: CategoriesTypes) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ListMenu[menuIndex].subMenus.push({
        name: category.category_nm,
        href: createUrl(`/products/${category.id}`),
      });
    });
  }

  return ListMenu;
};

export { setUsersMenus };
