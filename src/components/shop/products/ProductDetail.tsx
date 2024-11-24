/** @format */

import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/services/rupiah";
import ProductsTypes from "@/types/Products";
import Image from "next/image";
import { FC, MutableRefObject, useEffect, useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import "./styles.css";

import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductImagesTypes from "@/types/ProductImages";
import VariantsTypes from "@/types/Variants";
import useLogin from "@/stores/auth/login";
import { useRouter } from "next/navigation";
import useCartsApi from "@/stores/api/Carts";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

type Props = {
  product: ProductsTypes;
};

const ProductDetail: FC<Props> = ({ product }) => {
  // state
  const [variant, setVariant] = useState<VariantsTypes>();
  const [value, setValue] = useState(1);
  // router
  const router = useRouter();

  const increment = () => setValue((prevValue) => prevValue + 1);
  const decrement = () => setValue((prevValue) => Math.max(prevValue - 1, 1)); // Nilai tidak bisa kurang dari 1

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  // Fungsi untuk mengambil semua product_variant_images
  const getAllProductVariantImages = (
    productData: ProductsTypes
  ): ProductImagesTypes[] => {
    const images: ProductImagesTypes[] = [];
    productData.product_variants.forEach((variant) => {
      images.push(...variant.product_variant_images);
    });
    return images;
  };

  // Menggunakan fungsi
  const allProductVariantImages = getAllProductVariantImages(product);
  //  variant set
  useEffect(() => {
    if (product.product_variants.length > 0) {
      setVariant(product.product_variants[0]);
    }

    return () => {};
  }, [product]);

  const changeVariant = (row: VariantsTypes) => {
    setVariant(row);
  };

  // store
  const { addCart } = useCartsApi();
  const { cekToken, dtUser } = useLogin();
  const tambah = async () => {
    const cek = await cekToken();
    if (cek?.error) {
      return router.push("/profiles");
    }
    let costumQuantity = false;
    if (value > 1) {
      costumQuantity = true;
    }
    await addCart({
      product_variant_id: variant?.id,
      quantity: value,
      costumQuantity,
      user_id: dtUser?.id,
    });
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        {/* image */}
        <div className="lg:min-w-[28rem] lg:max-w-[28rem] min-w-[100%]">
          {/* show */}
          <div
            ref={sliderRef}
            className="keen-slider w-[30rem] relative h-[20rem]"
          >
            {allProductVariantImages.length > 0 ? (
              allProductVariantImages.map((image) => {
                const imgSrc = image?.product_img;
                return (
                  <Image
                    key={image.id}
                    src={`${BASE_URL}/${imgSrc}`}
                    alt=""
                    fill
                    className="keen-slider__slide object-cover"
                  />
                );
              })
            ) : (
              <Image
                src="/images/no_image.png"
                alt=""
                fill
                className="keen-slider__slide"
              />
            )}
          </div>
          {/* thumbnail */}
          {allProductVariantImages.length > 0 && (
            <div
              ref={thumbnailRef}
              className="keen-slider thumbnail relative h-20 w-10"
            >
              {allProductVariantImages.map((image) => {
                const imgSrc = image?.product_img;
                return (
                  <Image
                    key={image.id}
                    src={
                      imgSrc ? `${BASE_URL}/${imgSrc}` : "/images/no_image.png"
                    }
                    alt=""
                    fill
                    className="keen-slider__slide"
                  />
                );
              })}
            </div>
          )}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.product_nm}</h2>
        <h4>{product.category.category_nm}</h4>
        <div className="flex gap-x-1 flex-wrap">
          {product.product_variants.map((item) => {
            const active = item.id === variant?.id;
            return (
              <div key={item.id}>
                <div
                  className={`badge badge-outline cursor-pointer ${
                    active ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => changeVariant(item)}
                >
                  {item.variant_nm}
                </div>
              </div>
            );
          })}
        </div>
        <span>Stok: {variant?.stock}</span>
        <span className="text-lg font-bold">
          {showRupiah(variant?.price || 0)}
        </span>
        {/* jumlah */}
        <div className="flex items-center space-x-2 mt-2 px-2">
          {/* Tombol Kurang */}
          <button
            onClick={decrement}
            className="text-4xl text-gray-600 bg-transparent"
          >
            -
          </button>

          {/* Input Angka */}
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="text-center border-none focus:border-none"
          />

          {/* Tombol Tambah */}
          <button
            onClick={increment}
            className="text-4xl text-gray-600 bg-transparent"
          >
            +
          </button>
        </div>
        <div className="card-actions justify-between">
          <BsCartPlusFill
            className="text-accent cursor-pointer hover:text-primary"
            size={30}
            onClick={(e) => {
              e.stopPropagation();
              tambah();
            }}
          />
          <button className="btn btn-outline btn-accent">Beli</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
