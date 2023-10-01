import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getMyChats } from "../featchers/chat/chatActions";
import FirendsContainer from "../components/FirendsContainer";
import ChatsContainer from "../components/ChatsContainer";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Home() {
  const dispatch = useDispatch();
  const { chats, loading } = useSelector((s) => s.chat);
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getMyChats());
    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    socket.connect();
    socket.emit("addUser", user?._id);
    socket.on("newChat", () => dispatch(getMyChats()));
    socket.on("online", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("newChat");
    };
  }, [dispatch, user?._id]);

  return (
    <>
      <Navbar />
      {user && (
        <div className=" content-center capitalize p-2 ">
          <FirendsContainer onlines={activeUsers} />

          <ChatsContainer {...{ chats, loading, activeUsers }} />
        </div>
      )}
    </>
  );
}
