/** @format */
"use client";
import { User } from "@/types";
import React, { useState } from "react";
import Form from "./Form";
import useLogout from "@/stores/auth/logout";
import handleLogout from "@/app/auth/logout/logout";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import { useRouter } from "next/navigation";

type Props = {
  user?: User;
};

const Info = ({ user }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [loadLogout, setLoadLogout] = useState(false);
  // store
  const { setLogout } = useLogout();
  //   router
  const route = useRouter();
  return (
    <div className="grid grid-cols-2 gap-x-4 mt-4">
      {/* akun */}
      <div>
        <h1 className="font-bold text-xl text-center">Akun</h1>
        <div className="flex flex-col gap-y-8">
          <table>
            <tbody>
              <tr>
                <td className="font-bold pr-2">Nama:</td>
                <td className="">{user?.name}</td>
              </tr>
              <tr>
                <td className="font-bold pr-2">Email:</td>
                <td className="">{user?.email}</td>
              </tr>
            </tbody>
          </table>
          {loadLogout ? (
            <LoadingSpiner />
          ) : (
            <button
              className="btn btn-accent btn-outline w-fit"
              onClick={() => handleLogout({ setLogout, setLoadLogout, route })}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {/* info */}
      <div>
        {user?.user_info && user?.user_info?.length > 0 && (
          <div>
            <h1 className="font-bold text-xl text-center">Info</h1>
            <div className="flex flex-col gap-y-8">
              <table>
                <tbody>
                  <tr>
                    <td className="font-bold pr-2">Nama Penerima:</td>
                    <td className="">{user?.user_info[0].nm_user}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-2">No HP:</td>
                    <td className="">{user?.user_info[0].phone_number}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-2">Kecamatan:</td>
                    <td className="">
                      {
                        user?.user_info[0].shipping_cost.sub_district
                          .sub_district_nm
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-2">Kelurahan:</td>
                    <td className="">
                      {user?.user_info[0].shipping_cost.village_nm}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-2">Alamat:</td>
                    <td className="">{user?.user_info[0].address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!user?.user_info?.length && (
          <div className="flex flex-col gap-y-8">
            <h1 className="text-center text-xl font-bold">
              Anda belum melengkapi data diri
            </h1>
            <button
              className="btn btn-accent btn-outline w-fit self-center"
              onClick={() => setShowModal(true)}
            >
              Lengkapi
            </button>
          </div>
        )}
        <Form
          showModal={showModal}
          setShowModal={setShowModal}
          dtEdit={
            user?.user_info && user?.user_info[0] ? user?.user_info[0] : null
          }
          user={user as any}
        />
      </div>
    </div>
  );
};

export default Info;
