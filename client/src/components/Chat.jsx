import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../featchers/error/errorSlice";
import { useNavigate } from "react-router-dom";
import OnlineStatus from "./OnlineStatus";
import avatar from "../images/avatar.svg";
import checkIfImage from "../helper/checkIfImg";

export default function Chat({ reciver, sender, activeUsers }) {
  const [firendData, setFirendData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [checkImg, setcheckImg] = useState(false);

  const online =
    activeUsers.find((user) => user.userId === firendData._id) || false;

  if (!user) {
    navigate("/login");
  }
  // useEffect(() => {
  //   checkIfImage(user?.avatar, setcheckImg);
  // }, [user?.avatar]);

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
        // src={checkImg ? firendData.avatar : avatar}
        src={firendData.avatar}
        alt="firendPic"
      />
      <div>
        <p className=" text-xl text-gray-700 font-bold  ">{firendData.name}</p>
      </div>
      <OnlineStatus online={online} />
    </>
  );
}
