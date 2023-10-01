import React from "react";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function ChatsContainer({ chats, loading, activeUsers }) {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  return (
    <section className="container m-auto p-4  rounded-md bg-slate-300">
      {loading ? <Loading /> : ""}
      <h3 className=" font-bold -mt-4 p-1 tracking-wide">my chats</h3>
      <div className="grid w-full lg:grid-cols-3 item-center md:grid-cols-2 sm:grid-cols-2">
        {chats ? (
          chats.map((item) => (
            <div
              key={item._id}
              className="flex m-3 cursor-pointer hover:bg-sky-700 transition-opacity  relative items-center mx-auto p-2 w-full md:w-64  bg-sky-500 rounded-xl "
              onClick={() =>
                navigate(
                  `messenger/${item._id}-${
                    item.reciver === user._id ? item.sender : item.reciver
                  }`
                )
              }
            >
              <Chat {...{ ...item, activeUsers }} />
            </div>
          ))
        ) : (
          <h1 className="text-3xl md:text-6xl col-span-full text-gray-500 drop-shadow-2xl text-center font-bold">
            no chats
          </h1>
        )}
      </div>
    </section>
  );
}
