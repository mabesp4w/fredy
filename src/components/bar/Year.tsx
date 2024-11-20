/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type Props = {
  yearWatch: number | string;
  setValue: any;
  time: number;
};

const YearBar: FC<Props> = ({ yearWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const yearParams = params.get("year");
    return { url, params, yearParams };
  };
  const barYear = (year: string) => {
    const { url, params } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("year");
    // Tambahkan parameter sort baru
    params.append("year", year.toString());
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika yearParams ada
  useEffect(() => {
    setTimeout(() => {
      const { yearParams } = getUrl();
      if (!yearParams) {
        const year = new Date().getFullYear();
        setValue("year", year);
      } else {
        setValue("year", parseInt(yearParams));
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (yearWatch) {
      barYear(yearWatch.toString());
    } else {
      barYear("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearWatch]);

  return <></>;
};

export default YearBar;
