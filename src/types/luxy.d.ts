/** @format */

declare module "luxy.js" {
  interface LuxyOptions {
    wrapperSpeed?: number;
    wrapper?: string;
    targets?: string;
  }

  const luxy: {
    init: (options?: LuxyOptions) => void;
    destroy: () => void;
  };

  export default luxy;
}
