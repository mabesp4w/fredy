/** @format */
"use client";

import ProductLite from "@/components/shop/products/ProductLite";
import useProductsApi from "@/stores/api/Products";
import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import "keen-slider/keen-slider.min.css";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";

const Product = () => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 5,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        // Breakpoint untuk tablet dan mobile
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 1024px)": {
        // Breakpoint untuk layar kecil
        slides: {
          perView: 4,
          spacing: 12,
        },
      },
    },
  });
  // store
  const { setProductsWelcome, dtProductWelcome } = useProductsApi();
  // get data
  useEffect(() => {
    setProductsWelcome();
    return () => {};
  }, []);

  return (
    <>
      {/* best sellers */}
      <ScrollRevealComponent
        offset={200}
        animations="fade-right"
        className="relative h-[26rem] "
      >
        <div className="bg-neutral/20 px-4 pt-3 backdrop-blur-xl h-[26rem] absolute left-1/2 transform -translate-x-1/2 -top-24 w-[88%] rounded-3xl">
          {dtProductWelcome?.bestSellers &&
            dtProductWelcome.bestSellers.length > 0 && (
              <div ref={ref} className="flex items-center keen-slider">
                {dtProductWelcome?.bestSellers?.map(
                  (item: any, index: number) => (
                    <div
                      className="w-56 h-[24rem] keen-slider__slide"
                      key={index}
                    >
                      <ProductLite product={item} />
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      </ScrollRevealComponent>
      {/* new products */}
      <h1 className="text-2xl font-bold text-center">Produk Terbaru</h1>
      <div className="grid grid-cols-4 gap-4 p-3">
        {dtProductWelcome?.newProduct?.map((item: any, index: number) => (
          <ScrollRevealComponent
            animations="fade-up"
            key={index}
            className="h-full"
          >
            <ProductLite product={item} />
          </ScrollRevealComponent>
        ))}
      </div>
    </>
  );
};

export default Product;
