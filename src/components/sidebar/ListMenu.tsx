/** @format */
import MenuTypes from "@/types/MenuTypes";

import { BsBook, BsHouseDoor, BsSend } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";

const createUrl = (path: string) => `/admin${path}`;

const setAdminMenus = async () => {
  const ListMenu: MenuTypes[] = [
    {
      name: "Home",
      href: createUrl(""),
      icon: <BsHouseDoor />,
    },
    {
      name: "Ongkir",
      slug: "shippings",
      icon: <BsSend />,
      subMenus: [
        {
          name: "Kecamatan",
          href: createUrl("/shippings/subDistricts"),
        },
        {
          name: "Kelurahan",
          href: createUrl("/shippings/shippingCosts"),
        },
      ],
    },
    {
      name: "Makanan",
      slug: "foods",
      icon: <IoFastFoodOutline />,
      subMenus: [
        {
          name: "Jenis",
          href: createUrl("/foods/categories"),
        },
        {
          name: "Daftar",
          href: createUrl("/foods/lists"),
        },
      ],
    },
    {
      name: "Pesanan",
      href: createUrl("/orders"),
      icon: <BsBook />,
    },
  ];

  return ListMenu;
};

export { setAdminMenus };
