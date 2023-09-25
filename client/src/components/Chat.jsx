import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../featchers/error/errorSlice";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import OnlineStatus from "./OnlineStatus";
import avatar from "../images/avatar.svg";

export default function Chat({ reciver, sender }) {
  const [firendData, setFirendData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { activeUsers } = useContext(SocketContext);

  const online =
    activeUsers.find((user) => user.userId === firendData._id) || false;

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    const getFirend = async () => {
      try {
        const res = await axios.get(
          `/api/users/${reciver === user?._id ? sender : reciver}`,
          {
            withCredentials: true,
          }
        );
        setFirendData(res.data);
      } catch (error) {
        dispatch(addError(error.message));
      }
    };
    getFirend();
  }, [dispatch, reciver, sender, user?._id]);

  return (
    <>
      <img
        className="h-12 w-12 hover:scale-125 transition-all object-cover me-5 rounded-full"
        src={firendData.avatar || avatar}
        alt="firendPic"
      />
      <div>
        <p className=" text-xl text-gray-700 font-bold  ">{firendData.name}</p>
      </div>
      <OnlineStatus online={online} />
    </>
  );
}
