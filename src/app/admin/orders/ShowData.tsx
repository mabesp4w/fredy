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
import { BsInfoCircle } from "react-icons/bs";
import OrderDetail from "./OrderDetail";

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
  const [rowOrder, setRowOrder] = useState<OrdersTypes>();
  const [showDet, setShowDet] = useState(false);
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
      status: "dibayar,selesai",
    });
    setIsLoading(false);
  }, [setOrders, page, limit, search, sortby, order]);

  console.log({ dtOrders });

  useEffect(() => {
    debouncedFetchOrders(fetchOrders);

    // Cleanup debounce
    return () => {
      debouncedFetchOrders.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Nama", "Kelurahan", "Aksi"];
  const tableBodies = ["user_user_info_nm_user", "shipping_cost.village_nm"];

  const costume = (row: OrdersTypes) => {
    return (
      <BsInfoCircle
        className="cursor-pointer hover:text-accent"
        size={20}
        onClick={() => {
          setShowDet(true);
          setRowOrder(row);
        }}
      />
    );
  };

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
              costume={costume}
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
      <OrderDetail
        setShowModal={setShowDet}
        showModal={showDet}
        order={rowOrder}
      />
    </div>
  );
};

export default ShowData;
