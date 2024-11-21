/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useSubDistricts from "@/stores/crud/SubDistricts";
import SubDistrictsTypes from "@/types/SubDistricts";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// subDistricts
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: SubDistrictsTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setSubDistricts, dtSubDistricts } = useSubDistricts();
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
  const debouncedFetchSubDistricts = _.debounce((fetchSubDistricts) => {
    fetchSubDistricts();
  }, 500); // 500ms delay

  const fetchSubDistricts = useCallback(async () => {
    setLimit(10);
    await setSubDistricts({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setSubDistricts, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchSubDistricts(fetchSubDistricts);

    // Cleanup debounce
    return () => {
      debouncedFetchSubDistricts.cancel();
    };
  }, [search, sortby, order, page, limit]);

  // table
  const headTable = ["No", "Nama", "Aksi"];
  const tableBodies = ["sub_district_nm"];

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
              dataTable={dtSubDistricts?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtSubDistricts?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtSubDistricts?.current_page}
                totalPages={dtSubDistricts?.last_page}
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
