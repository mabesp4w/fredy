/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useCategories from "@/stores/crud/Categories";
import CategoriesTypes from "@/types/Categories";

type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};
// categories
type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: CategoriesTypes) => void;
};

const ShowData: FC<Props> = ({ setDelete, setEdit }) => {
  const { setCategories, dtCategories } = useCategories();
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
  const debouncedFetchCategories = _.debounce((fetchCategories) => {
    fetchCategories();
  }, 500); // 500ms delay

  const fetchCategories = useCallback(async () => {
    setLimit(10);
    await setCategories({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  }, [setCategories, page, limit, search, sortby, order]);

  useEffect(() => {
    debouncedFetchCategories(fetchCategories);

    // Cleanup debounce
    return () => {
      debouncedFetchCategories.cancel();
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
              dataTable={dtCategories?.data}
              page={page}
              limit={limit}
              setEdit={setEdit}
              setDelete={setDelete}
              ubah={true}
              hapus={true}
            />
          </div>
          {dtCategories?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtCategories?.current_page}
                totalPages={dtCategories?.last_page}
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
