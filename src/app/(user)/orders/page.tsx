/** @format */
"use client";
import useOrdersApi from "@/stores/api/Orders";
import useLogin from "@/stores/auth/login";
import React, { useCallback, useEffect, useState } from "react";
import PayWait from "./PayWait";
import LoadingSpiner from "@/components/loading/LoadingSpiner";

const Orders = () => {
  const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  // store
  const { cekToken, dtUser } = useLogin();
  const { setOrdersAll, dtOrders } = useOrdersApi();
  // state
  const [status, setStatus] = useState<string>("tunggu");
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // call cek token
  useEffect(() => {
    cekToken();
  }, [cekToken]);

  // get orders
  const getOrders = useCallback(async () => {
    setIsLoading(true);
    await setOrdersAll({ user_id: dtUser?.id, status });
    setIsLoading(false);
  }, [dtUser?.id, setOrdersAll, status]);

  useEffect(() => {
    if (dtUser) {
      getOrders();
    }
  }, [dtUser, getOrders, setOrdersAll, status]);

  // useEffect
  useEffect(() => {
    // Memuat skrip Snap.js
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // URL untuk sandbox atau production
    //  get MIDTRANS_CLIENT_KEY from .env
    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY || "");
    script.onload = () => setSnapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const tabs = [
    { id: "tunggu", label: "Belum Bayar" },
    { id: "dikemas", label: "Dikemas" },
    { id: "dikirim", label: "Dikirim" },
    { id: "selesai", label: "Selesai" },
    { id: "batal", label: "Batal" },
  ];

  return (
    <section className="container">
      <div className="max-w-[30rem] mx-auto">
        {/* Tab List */}
        <div role="tablist" className="tabs tabs-lifted">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              className={`tab ${
                status === tab.id ? "bg-primary text-secondary" : ""
              }`}
              onClick={() => setStatus(tab.id)}
            >
              {tab.label}
            </a>
          ))}
        </div>
        {isLoading && <LoadingSpiner />}
        {!isLoading && (
          <>
            {/* rincian pesanan */}
            <h1 className="text-center font-bold mb-4">
              Rincian pesanan
              <hr />
            </h1>
            {dtOrders.length > 0 ? (
              dtOrders.map((order) => (
                <div key={order.id}>
                  {status === "tunggu" && (
                    <PayWait
                      order={order}
                      snapLoaded={snapLoaded}
                      key={order.id}
                    />
                  )}
                  {status === "dikemas" && <p>Content for Tab 2</p>}
                  {status === "dikirim" && <p>Content for Tab 3</p>}
                  {status === "selesai" && <p>Content for Tab 3</p>}
                  {status === "batal" && <p>Content for Tab 3</p>}
                </div>
              ))
            ) : (
              <p>Belum ada pesanan</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Orders;
