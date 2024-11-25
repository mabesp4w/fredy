/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useOrders from "@/stores/crud/Orders";
import OrdersTypes from "@/types/Orders";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// orders
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: OrdersTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setOrders, dtOrders } = useOrders();
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
  const debouncedFetchOrders = _.debounce((fetchOrders) => {
    fetchOrders();
  }, 500); // 500ms delay

  const fetchOrders = useCallback(async () => {
    setLimit(10);
    await setOrders({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setOrders, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchOrders(fetchOrders);

    // Cleanup debounce
    return () => {
      debouncedFetchOrders.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Nama", "Aksi"];
  const tableBodies = ["category_nm"];

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
              dataTable={dtOrders?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtOrders?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtOrders?.current_page}
                totalPages={dtOrders?.last_page}
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
