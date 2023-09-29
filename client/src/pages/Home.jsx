import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyChats } from "../featchers/chat/chatActions";
import FirendsContainer from "../components/FirendsContainer";
import ChatsContainer from "../components/ChatsContainer";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((s) => s.auth);
  const { chats } = useSelector((s) => s.chat);

  useEffect(() => {
    if (error) console.log(error);

    if (!user) navigate("/login");
  }, [error, navigate, user]);

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);
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
