/** @format */

import Image from "next/image";
import Product from "./Product";
import RellaxWrapper from "@/components/effects/RellaxWrapper";

export default function Home() {
  // check pathname
  return (
    <section className="flex flex-col w-full">
      <RellaxWrapper speed={-7} className="absolute left-0 top-0 z-50">
        <Image
          alt="logo"
          src="/images/logo.png"
          className="mx-auto mb-3"
          width={300}
          height={100}
          priority
        />
      </RellaxWrapper>
      <div className="h-svh relative">
        <div className="bg-dapoer-alea bg-cover bg-right absolute w-full h-full -top-28 z-10"></div>
      </div>
      {/* image */}
      <div className="relative h-80 w-full rounded-lg container">
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
