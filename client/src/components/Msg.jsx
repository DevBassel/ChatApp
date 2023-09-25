import React from "react";
import { useSelector } from "react-redux";

export default function Msg({ from, text }) {
  const { user } = useSelector((s) => s.auth);
  return (
    <div
      className={`w-3/4 my-3 break-all rounded-md p-2 text-white  text ${
        user._id === from
          ? "ms-3 bg-gradient-to-r from-sky-500 to-indigo-500"
          : "ms-auto me-3 bg-gradient-to-r from-violet-500 to-fuchsia-500"
      }`}
    >
      <h2 className="">{text}</h2>
    </div>
  );
}
