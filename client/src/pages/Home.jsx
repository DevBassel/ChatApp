import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getMyChats } from "../featchers/chat/chatActions";
import FirendsContainer from "../components/FirendsContainer";
import ChatsContainer from "../components/ChatsContainer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { chats, loading } = useSelector((s) => s.chat);
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    user && dispatch(getMyChats());
  }, [dispatch, navigate, user]);

  return (
    <>
      <Navbar />
      {user && (
        <div className=" content-center capitalize p-2 ">
          <FirendsContainer />

          <ChatsContainer {...{ chats, loading }} />
        </div>
      )}
    </>
  );
}
