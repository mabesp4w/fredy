/** @format */

import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/services/rupiah";
import useCartsApi from "@/stores/api/Carts";
import useLogin from "@/stores/auth/login";
import CartsTypes from "@/types/Carts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBag, IoTrash } from "react-icons/io5";

// type Props = {};

const Cart = () => {
  // state
  const [isOpen, setIsOpen] = useState(false);
  // store
  const { setCarts, removeCarts, dtCarts } = useCartsApi();
  const { cekToken, dtUser } = useLogin();
  // router
  const router = useRouter();

  // call cek token
  useEffect(() => {
    cekToken();

    return () => {};
  }, [cekToken]);

  useEffect(() => {
    if (dtUser) {
      setCarts({ user_id: dtUser.id });
    }
  }, [dtUser, setCarts]);

  // Untuk mencegah scroll di belakang sidebar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === "sidebar-overlay") {
      onClose();
    }
  };

  const removeItem = async (row: CartsTypes) => {
    const { user_id, product_variant_id } = row;
    await removeCarts({ user_id, product_variant_id });
  };

  return (
    <div className="overflow-hidden relative">
      <button
        className="flex gap-2 items-center rounded-fullpx-5 py-2"
        onClick={() => setIsOpen(true)}
      >
        <IoBag />
        {/* count totoal */}
        <span className="font-bold">
          {showRupiah(
            dtCarts?.data.reduce(
              (acc, cart) => acc + cart.product_variant.price * cart.quantity,
              0
            )
          )}
        </span>
      </button>
      <div
        id="sidebar-overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity  h-screen ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "hidden opacity-0 pointer-events-none"
        }`}
        onClick={handleClickOutside}
      >
        <div
          className={`absolute right-0 top-0 h-full bg-white shadow-lg z-60 transform transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 w-[20rem] text-black">
            <button className="mb-4 text-red-500" onClick={onClose}>
              X
            </button>
            {!dtUser && (
              <h1>
                Silahkan{" "}
                <span className="underline text-neutral hover:no-underline">
                  <Link href="/profiles">Login</Link>
                </span>{" "}
                terlebih dahulu
              </h1>
            )}
            <div className="flex flex-col gap-y-4">
              {dtCarts?.data &&
                dtCarts.data.length > 0 &&
                dtCarts.data.map((cart) => {
                  const productWithImages =
                    cart.product_variant.product_variant_images?.filter(
                      (variant) => variant.product_img
                    );

                  const img =
                    productWithImages.length > 0
                      ? `${BASE_URL}/${productWithImages[0].product_img}`
                      : "/images/no_image.jpg";
                  return (
                    <div
                      key={cart.id}
                      className="flex justify-between border-y py-2 items-center cursor-pointer"
                    >
                      <div
                        className="flex gap-x-2"
                        onClick={() =>
                          router.push(
                            `/products/detail/${cart.product_variant.product.id}`
                          )
                        }
                      >
                        <Image
                          src={img}
                          alt={cart.product_variant.product.product_nm}
                          width={100}
                          height={100}
                          className="w-14 object-cover"
                        />
                        <div className="flex flex-col">
                          <span>{cart.product_variant.product.product_nm}</span>
                          <span className="text-sm">
                            x {cart.quantity}-{cart.product_variant.variant_nm}
                          </span>
                          <span className="text-accent font-bold">
                            {showRupiah(
                              cart.product_variant.price * cart.quantity
                            )}
                          </span>
                        </div>
                      </div>
                      <IoTrash
                        className="cursor-pointer hover:text-accent"
                        onClick={() => removeItem(cart)}
                      />
                    </div>
                  );
                })}
              {/* count total */}
              <div className="flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-accent">
                  {showRupiah(
                    dtCarts?.data.reduce(
                      (acc, cart) =>
                        acc + cart.product_variant.price * cart.quantity,
                      0
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
