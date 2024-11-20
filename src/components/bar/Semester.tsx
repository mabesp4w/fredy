/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { momentId } from "@/utils/momentIndonesia";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type Props = {
  semesterWatch: number | string;
  setValue: any;
  time: number;
};

const SemesterBar: FC<Props> = ({ semesterWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const semesterParams = params.get("semester");
    return { url, params, semesterParams };
  };
  const barSemester = (semester: string) => {
    const { url, params } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("semester");
    // Tambahkan parameter sort baru
    params.append("semester", semester);
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika semesterParams ada
  useEffect(() => {
    setTimeout(() => {
      const { semesterParams } = getUrl();
      if (!semesterParams) {
        const month = momentId().month() + 1;
        console.log({ month });
        const semester = month > 6 ? "Ganjil" : "Genap";
        setValue("semester", semester);
      } else {
        setValue("semester", semesterParams);
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (semesterWatch) {
      console.log({ semesterWatch });
      barSemester(semesterWatch.toString());
    } else {
      barSemester("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterWatch]);

  return <></>;
};

export default SemesterBar;
