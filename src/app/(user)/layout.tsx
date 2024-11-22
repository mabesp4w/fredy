/** @format */

import HeaderComp from "@/components/header/HeaderComp";
import HeaderFixed from "@/components/header/HeaderFixed";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <HeaderFixed />
      <main className="flex flex-col text-[16px] text-destructive min-h-full">
        <header className="flex flex-col">
          <HeaderComp />
        </header>
        <main className="mx-4 flex grow my-14">{children}</main>
        <footer>User Footer</footer>
      </main>
    </>
  );
};

export default layout;
