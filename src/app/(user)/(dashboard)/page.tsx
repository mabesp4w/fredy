/** @format */

import Image from "next/image";
import Product from "./Product";

export default function Home() {
  return (
    <section className="container flex flex-col">
      {/* image */}
      <div className="relative h-80 w-full rounded-lg">
        <Image
          src="/images/banner.png"
          alt="dapoer alea"
          fill
          className="object-cover rounded-3xl"
        />
        {/* tulisan */}
        <div className="absolute top-1/3 left-10 md:right-1/2 transform -translate-y-1/3 bg-accent/50 md:bg-transparent">
          <h1 className="text-3xl text-neutral font-bold">Selamat datang!</h1>
          <h2 className="text-lg mt-2 text-black">
            Nikmati hidangan berkualitas tinggi dengan layanan pesan antar yang
            mudah dan cepat. Pesan sekarang!
          </h2>
        </div>
      </div>
      <Product />
    </section>
  );
}
