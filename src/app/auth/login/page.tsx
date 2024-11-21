/** @format */

import Form from "./Form";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-h-screen bg-2 bg-cover bg-center flex flex-col justify-center ">
      <div className="px-10 pb-10 xs:p-0">
        <Image
          alt="logo"
          src="/images/katada.png"
          className="mx-auto mb-3"
          width={100}
          height={100}
        />
        <div className="text-center font-merriweather font-black text-lg my-4 text-white">
          <h4 className="text-xl">SIAKAD</h4>
          <p>Sistem Informasi Akademik</p>
          <p>SMA YPPK TARUNA DHARMA JAYAPURA</p>
        </div>
        <div className="backdrop-blur-lg shadow w-full rounded-lg pb-3  mx-auto md:w-full md:max-w-md">
          <Form />
        </div>
        {/* <Link href="/" className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="inline-block ml-1 text-fourth">
                  Kembali Ke Halaman Utama
                </span>
              </button>
            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
