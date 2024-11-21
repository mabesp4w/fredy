/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useProducts from "@/stores/crud/Products";
import ProductsTypes from "@/types/Products";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// products
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: ProductsTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setProducts, dtProducts } = useProducts();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams?.get("sortby") || "";
  const order = searchParams?.get("order") || "";
  const search = searchParams?.get("cari") || "";

  // Define the debounced function outside of `useCallback`
  const debouncedFetchProducts = _.debounce((fetchProducts) => {
    fetchProducts();
  }, 500); // 500ms delay

  const fetchProducts = useCallback(async () => {
    setLimit(10);
    await setProducts({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setProducts, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchProducts(fetchProducts);

    // Cleanup debounce
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Jenis", "Nama", "Aksi"];
  const tableBodies = ["category.category_nm", "product_nm"];

  return (
    <div className="flex-1 flex-col max-w-full h-full overflow-auto">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className="">
            <TablesDefault
              headTable={headTable}
              tableBodies={tableBodies}
              dataTable={dtProducts?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtProducts?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtProducts?.current_page}
                totalPages={dtProducts?.last_page}
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
