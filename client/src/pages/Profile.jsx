import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import {
  BiSolidBadgeCheck,
  BiSolidUser,
  BiTime,
  BiImageAdd,
  BiEditAlt,
  BiSolidUserBadge,
} from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import UpdateProfile from "../components/UpdateProfile";
import { useState } from "react";
export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const [updateForm, setUpdateForm] = useState(false);

  return (
    user && (
      <>
        <Navbar />

        <section className="bg-gray-500 container mt-3 p-2 m-auto rounded">
          <div className="flex flex-col  md:flex-row items-center justify-center   ">
            <div className=" w-full h-80 md:w-52 relative md:h-44 md:me-5 overflow-hidden   rounded-2xl">
              <img
                src={user.avatar}
                alt="avatar"
                className="object-cover h-full w-full"
              />
              <div className="absolute bottom-0 right-0  text-indigo-500 text-5xl cursor-pointer backdrop-blur-sm rounded-lg">
                <BiImageAdd onClick={() => setUpdateForm(true)} />
              </div>
            </div>
            <div className="bg-slate-400 relative w-full md:w-fit leading-10 mt-3 md:mt-0 p-4 px-14 font-bold rounded-2xl">
              <h1>
                <BiSolidUserBadge className="inline-flex me-3 text-indigo-500 text-3xl" />
                {user?._id}
              </h1>
              <h1>
                <BiSolidUser className="inline-flex me-3 text-indigo-500 text-3xl" />
                {user?.name}
              </h1>
              <h1>
                <MdOutlineAlternateEmail className="inline-flex me-3 text-indigo-500 text-3xl" />
                {user?.email}
                <BiSolidBadgeCheck className="inline-flex ms-3 text-indigo-500 text-3xl" />
              </h1>
              <h1>
                <BiTime className="inline-flex me-3 text-indigo-500 text-3xl" />

                {user?.createdAt}
              </h1>
              <BiEditAlt
                onClick={() => setUpdateForm(true)}
                className="absolute bg-gray-500 bottom-0 right-0  text-5xl cursor-pointer backdrop-blur-sm text-white rounded-s-lg"
              />
            </div>
          </div>
        </section>
        {updateForm && <UpdateProfile fun={() => setUpdateForm(false)} />}
      </>
    )
  );
}
