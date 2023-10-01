import React, { useEffect, useState } from "react";
import avatarXD from "../images/avatar.svg";
import OnlineStatus from "./OnlineStatus";
import checkIfImage from "../helper/checkIfImg";

export default function Firend({ name, avatar, _id, onlines }) {
  const [checkImg, setcheckImg] = useState(false);

  const activeUsers = onlines.find((user) => user.userId === _id) || false;

  useEffect(() => {
    checkIfImage(avatar, setcheckImg);
  }, [avatar]);

  return (
    <>
      <OnlineStatus online={activeUsers} />
      <img
        className="w-full h-full object-cover hover:scale-125 hover:rotate-12 transition"
        src={checkImg ? avatar : avatarXD}
        alt="Firend"
      />
      <h3 className="absolute bottom-0 w-full text-center font-bold bg-opacity-70   text-white bg-teal-700">
        {name}
      </h3>
    </>
  );
}
