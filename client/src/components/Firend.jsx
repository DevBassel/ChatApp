import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import OnlineStatus from "./OnlineStatus";
import avatarXD from "../images/avatar.svg";

export default function Firend({ name, avatar, _id }) {
  const { activeUsers } = useContext(SocketContext);

  const online = activeUsers.find((user) => user.userId === _id) || false;

  return (
    <>
      <OnlineStatus online={online} />
      <img
        className="w-full h-full object-cover hover:scale-125 hover:rotate-12 transition"
        src={avatar || avatarXD}
        alt="Firend"
      />
      <h3 className="absolute bottom-0 w-full text-center font-bold bg-opacity-70   text-white bg-teal-700">
        {name}
      </h3>
    </>
  );
}
