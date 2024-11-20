/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";

import { useInView, useSpring, animated } from "@react-spring/web";
import { FC } from "react";

type Props = {
  endValue: number;
  addClass?: string;
  animationConfig?: any;
};

const AnimatedNumber: FC<Props> = ({ endValue, animationConfig, addClass }) => {
  const [refNumber, inView] = useInView({ once: true });
  const animNumber = useSpring({
    number: inView ? endValue : 0,
    from: { number: 0 },
    config: animationConfig,
    delay: 1000,
  });

  return (
    <animated.span ref={refNumber} className={addClass}>
      {animNumber.number.to((value: number) => Math.floor(value))}
    </animated.span>
  );
};

export default AnimatedNumber;
