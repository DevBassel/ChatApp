import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addError } from "../featchers/error/errorSlice";
import Navbar from "../components/Navbar";
import { logOut } from "../featchers/auth/authActions";
import { getMyChats } from "../featchers/chat/chatActions";
import { SocketContext } from "../context/SocketContext";
import { chatReset } from "../featchers/chat/chatSlice";
import FirendsContainer from "../components/FirendsContainer";
import ChatsContainer from "../components/ChatsContainer";

export default function Home() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((s) => s.auth);
  const { chats, chatErr } = useSelector((s) => s.chat);
  if (!user) navigate("/login");

  useEffect(() => {
    if (error.includes("Unauthorized") || error.includes("User Not Found")) {
      dispatch(logOut());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user?._id);
      socket.on("newChat", () => {
        dispatch(getMyChats());
      });
    }
  }, [dispatch, socket, user?._id]);

  useEffect(() => {
    dispatch(getMyChats());
    dispatch(chatReset());
  }, [dispatch, navigate]);

  if (error) dispatch(addError(error));
  if (chatErr) dispatch(addError(chatErr));

  return (
    <>
      <Navbar />
      <div className=" content-center capitalize p-2 ">
        <FirendsContainer />

        <ChatsContainer {...{ chats }} />
      </div>
    </>
  );
}
