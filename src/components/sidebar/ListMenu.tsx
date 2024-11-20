/** @format */
import MenuTypes from "@/types/MenuTypes";

import {
  BsActivity,
  BsAlarm,
  BsBook,
  BsBricks,
  BsHouseDoor,
  BsNewspaper,
  BsPerson,
  BsPlayBtnFill,
} from "react-icons/bs";

const createUrl = (path: string) => `/roles/admin${path}`;

const setAdminMenus = async () => {
  const ListMenu: MenuTypes[] = [
    {
      name: "Home",
      href: createUrl("/dashboard"),
      icon: <BsHouseDoor />,
    },
    {
      name: "Pengumuman",
      href: createUrl("/announcements"),
      icon: <BsActivity />,
    },
    {
      name: "Berita",
      href: createUrl("/news"),
      icon: <BsNewspaper />,
    },

    {
      name: "Slide",
      href: createUrl("/slides"),
      icon: <BsPlayBtnFill />,
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
      name: "Mapel",
      href: createUrl("/subjects"),
      icon: <BsBook />,
    },
    {
      name: "Pegawai / Staf",
      slug: "employees",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Guru",
          href: createUrl("/employees/guru"),
        },
        {
          name: "Tendik",
          href: createUrl("/employees/tendik"),
        },
        {
          name: "Satpam",
          href: createUrl("/employees/satpam"),
        },
        {
          name: "Pekarya",
          href: createUrl("/employees/pekarya"),
        },
      ],
    },

    {
      name: "Siswa",
      slug: "students",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Daftar",
          href: createUrl("/students/lists"),
        },
        {
          name: "Status",
          href: createUrl("/students/statuses"),
        },
        {
          name: "Osis",
          href: createUrl("/students/osis"),
        },
      ],
    },
    {
      name: "Prestasi",
      slug: "achievements",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Kategori",
          href: createUrl("/achievements/categories"),
        },
        {
          name: "Siswa",
          href: createUrl("/achievements/students"),
        },
      ],
    },
    {
      name: "Kelas",
      slug: "shoolClasses",
      icon: <BsBricks />,
      subMenus: [
        {
          name: "Daftar",
          href: createUrl("/shoolClasses/lists"),
        },
        {
          name: "Siswa",
          href: createUrl("/shoolClasses/studentClasses"),
        },
      ],
    },
    {
      name: "Jadwal",
      href: createUrl("/schedules"),
      icon: <BsAlarm />,
    },

    {
      name: "Kegiatan",
      slug: "activities",
      icon: <BsPerson />,
      subMenus: [
        {
          name: "Kalender Akademik",
          href: createUrl("/activities/academicCalendars"),
        },
        {
          name: "Ektrakulikuler",
          href: createUrl("/activities/extracurricular/categories"),
        },
      ],
    },
    {
      name: "Fasilitas",
      href: createUrl("/facilities"),
      icon: <BsAlarm />,
    },
  ];

  return ListMenu;
};

export { setAdminMenus };
