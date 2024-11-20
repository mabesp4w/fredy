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
  tglAbsenWatch: number | string;
  setValue: any;
  time: number;
};

const TglAbsenBar: FC<Props> = ({ tglAbsenWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const tglAbsenParams = params.get("tglAbsen");
    return { url, params, tglAbsenParams };
  };
  const barTglAbsen = (tglAbsen: string) => {
    const { url, params } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("tglAbsen");
    // Tambahkan parameter sort baru
    params.append("tglAbsen", tglAbsen.toString());
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika tglAbsenParams ada
  useEffect(() => {
    setTimeout(() => {
      const { tglAbsenParams } = getUrl();
      if (!tglAbsenParams) {
        setValue("tgl_absen", momentId().format("YYYY-MM-DD"));
      } else {
        console.log({ tglAbsenParams });
        setValue("tgl_absen", tglAbsenParams);
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tglAbsenWatch) {
      barTglAbsen(tglAbsenWatch.toString());
    } else {
      barTglAbsen("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tglAbsenWatch]);

  return <></>;
};

export default TglAbsenBar;
