/** @format */

"use client";
import React, { FC, useEffect, useRef } from "react";
import Rellax from "rellax";

type Props = {
  children: React.ReactNode;
  speed?: number;
};

const RellaxWrapper: FC<Props> = ({ children, speed = -7 }) => {
  const rellaxRef = useRef(null);

  useEffect(() => {
    if (rellaxRef.current) {
      const rellax = new Rellax(rellaxRef.current, {
        speed: speed,
        center: false,
      });

      return () => rellax.destroy();
    }
  }, [speed]);

  return <div ref={rellaxRef}>{children}</div>;
};

export default RellaxWrapper;
