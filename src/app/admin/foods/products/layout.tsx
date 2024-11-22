/** @format */

import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main>
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default layout;
