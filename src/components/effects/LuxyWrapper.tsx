/** @format */

"use client";
import luxy from "luxy.js";
import React, { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const LuxyWrapper: FC<Props> = ({ children, className }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      luxy.init({
        wrapperSpeed: 0.06, // Ubah sesuai kebutuhan
        targets: ".luxy-el",
        wrapper: "#luxy",
      });
    }
  }, []);

  return (
    <div id="luxy" className={className}>
      {children}
    </div>
  );
};

export default LuxyWrapper;
