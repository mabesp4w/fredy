/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useShippingCosts from "@/stores/crud/ShippingCosts";
import ShippingCostsTypes from "@/types/ShippingCosts";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// shippingCosts
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: ShippingCostsTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setShippingCosts, dtShippingCosts } = useShippingCosts();
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
  const debouncedFetchShippingCosts = _.debounce((fetchShippingCosts) => {
    fetchShippingCosts();
  }, 500); // 500ms delay

  const fetchShippingCosts = useCallback(async () => {
    setLimit(10);
    await setShippingCosts({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setShippingCosts, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchShippingCosts(fetchShippingCosts);

    // Cleanup debounce
    return () => {
      debouncedFetchShippingCosts.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Kecamatan", "Kelurahan", "Ongkos", "Aksi"];
  const tableBodies = [
    "sub_district.sub_district_nm",
    "village_nm",
    "shipping_cost",
  ];

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
              dataTable={dtShippingCosts?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtShippingCosts?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtShippingCosts?.current_page}
                totalPages={dtShippingCosts?.last_page}
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
