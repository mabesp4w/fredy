/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import lightImgDB from "@/components/lightBox/lightImgDB";
import LightPlugins from "@/components/lightBox/LightPlugins";
import ProductImagesTypes from "@/types/ProductImages";
import useProductImages from "@/stores/crud/ProductImages";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// productImages
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: ProductImagesTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setProductImages, dtProductImages } = useProductImages();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexBox, setIndexBox] = useState<number>(-1);
  const [showSlides, setShowSlides] = useState<never>();
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams?.get("sortby") || "";
  const order = searchParams?.get("order") || "";
  const search = searchParams?.get("cari") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchproductImages = _.debounce((fetchproductImages) => {
    fetchproductImages();
  }, 500); // 500ms delay

  const fetchproductImages = useCallback(async () => {
    setLimit(10);
    await setProductImages({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setProductImages, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchproductImages(fetchproductImages);

    // Cleanup debounce
    return () => {
      debouncedFetchproductImages.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = [
    "No",
    "Nama",
    "Tipe",
    "Lokasi",
    "Kondisi",
    "Jumlah",
    "Deskripsi",
    "Gambar",
    "Aksi",
  ];
  const tableBodies = [
    "nm_facility",
    "type",
    "location",
    "condition",
    "quantity",
    "description",
    "img_facility",
  ];

  useEffect(() => {
    setShowSlides(
      lightImgDB({
        data: dtProductImages?.data,
        picture: "img_facility",
        title: { path: "nm_facility" },
        description: { path: "description" },
        width: 3840,
        height: 5760,
      })
    );
  }, [dtProductImages?.data]);

  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {/* lightBox */}
      <LightPlugins
        index={indexBox}
        setIndex={setIndexBox}
        slides={showSlides}
      />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="">
            <TablesDefault
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtProductImages?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
              sorter="nm_facility"
              setIndexBox={setIndexBox}
            />
          </div>
          {dtProductImages?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtProductImages?.current_page}
                totalPages={dtProductImages?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowData;
