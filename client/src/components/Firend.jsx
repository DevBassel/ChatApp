import React, { useContext, useEffect, useState } from "react";
import avatarXD from "../images/avatar.svg";
import axios from "axios";
import OnlineStatus from "./OnlineStatus";

export default function Firend({ name, avatar, _id, onlines }) {
  const [checkImg, setcheckImg] = useState(404);

  const activeUsers = onlines.find((user) => user.userId === _id) || false;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(avatar);
        setcheckImg(res.status);
      } catch (error) {
        setcheckImg(404);
      }
    })();
  }, [avatar]);
  return (
    <>
      <OnlineStatus online={activeUsers} />
      <img
        className="w-full h-full object-cover hover:scale-125 hover:rotate-12 transition"
        src={checkImg === 200 ? avatar : avatarXD}
        alt="Firend"
      />
      <h3 className="absolute bottom-0 w-full text-center font-bold bg-opacity-70   text-white bg-teal-700">
        {name}
      </h3>
    </>
  );
}
