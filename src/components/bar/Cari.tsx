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
  cariWatch: number | string;
  setValue: any;
  time: number;
};

const Cari: FC<Props> = ({ cariWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const cariParams = params.get("cari");
    return { url, params, cariParams };
  };
  const barCari = (cari: string) => {
    const { url, params } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("cari");
    // Tambahkan parameter sort baru
    params.append("cari", cari);
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika cariParams ada
  useEffect(() => {
    setTimeout(() => {
      const { cariParams } = getUrl();
      if (!cariParams) {
        barCari("");
      } else {
        setValue("cari", parseInt(cariParams));
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cariWatch) {
      barCari(cariWatch.toString());
    } else {
      barCari("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cariWatch]);

  return <></>;
};

export default Cari;
