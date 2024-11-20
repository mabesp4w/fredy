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
  fakultasWatch: number | string;
  setValue: any;
  time: number;
};

const Fakultas: FC<Props> = ({ fakultasWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const fakultasParams = params.get("fakultas_id");
    return { url, params, fakultasParams };
  };

  const barFakultas = (fakultas_id: string) => {
    const { url, params } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("fakultas_id");
    // Tambahkan parameter sort baru
    params.append("fakultas_id", fakultas_id);
    //  if not isMain add & fakultas_id=
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika fakultasParams ada
  useEffect(() => {
    setTimeout(() => {
      const { fakultasParams } = getUrl();
      if (!fakultasParams) {
        barFakultas("");
      } else {
        setValue("fakultas_id", parseInt(fakultasParams));
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fakultasWatch) {
      barFakultas(fakultasWatch.toString());
    } else {
      barFakultas("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fakultasWatch]);

  return <></>;
};

export default Fakultas;
