import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Msg from "../components/Msg";
import avatar from "../images/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../featchers/error/errorSlice";
import { SocketContext } from "../context/SocketContext";
import OnlineStatus from "../components/OnlineStatus";

export default function Messenger() {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const API = "/api";
  const [msgs, setMsgs] = useState([]);
  const [firendData, setFirendData] = useState("");
  const [msgContent, setContent] = useState("");
  const scrollDown = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { socket, activeUsers } = useContext(SocketContext);
  const [typeing, setTyping] = useState(false);
  const online =
    activeUsers.find((user) => user.userId === firendData._id) || false;

  useEffect(() => {
    if (socket) {
      socket.on("typeing", (data) => setTyping(data.status));
      socket.on("stopTypeing", (data) => setTyping(data.status));
    }
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${API}/chat/msg/${chatId.split("-")[0]}`,
          {
            withCredentials: true,
          }
        );
        setMsgs(response.data);
      } catch (error) {
        dispatch(addError(error.message));
        navigate("/");
        console.log(error);
      }
    })();

    (async () => {
      try {
        const response = await axios.get(
          `${API}/users/${chatId.split("-")[1]}`,
          {
            withCredentials: true,
          }
        );
        setFirendData(response.data);
      } catch (error) {
        dispatch(addError(error.message));
        navigate("/");
        console.log(error);
      }
    })();
  }, [API, chatId, dispatch, navigate]);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user?._id);
      socket.on("msg", (data) => {
        setMsgs([...msgs, data]);
      });
    }
    scrollDown.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, socket, user?._id]);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (msgContent.trim() !== "") {
      try {
        const data = {
          from: user._id,
          to: firendData._id,
          text: msgContent,
        };
        await axios.post(
          `${API}/chat/msg`,
          {
            text: msgContent,
            to: chatId.split("-")[1],
            chatId: chatId.split("-")[0],
          },
          { withCredentials: true }
        );
        setMsgs([...msgs, data]);
        socket?.emit("msg", data);
        console.log({ data });
        setContent("");
        e.target.focus();
      } catch (error) {
        dispatch(addError(error.message));

        console.log(error?.message);
      }
    } else dispatch(addError("not valid msg"));
  };

  const startTyping = ({ key }) => {
    console.log(key);
    if (key !== "Tab") {
      socket.emit("typeing", {
        userId: firendData._id,
      });
    }
  };
  const stopTyping = ({ key }) => {
    if (key !== "Tab") {
      setTimeout(() => {
        socket.emit("stopTypeing", {
          userId: firendData._id,
        });
      }, 1500);
    }
  };
  return (
    <section className="bg-gradient-to-tr from-sky-500 to-indigo-500">
      <div className="container   flex h-screen flex-col justify-between items-center m-auto rounded-md">
        {/* firend info container */}
        <div
          className="flex fixed
         bg-black bg-opacity-50 text-white w-2/3  lg:w-1/3 mx-auto rounded-3xl items-center"
        >
          {/* user image  */}
          <div className="relative h-full  overflow-hidden">
            {typeing ? (
              <h5 className=" bg-green-500 text-center flex items-center text-white w-12 h-12 bg-opacity-40 rounded-full   absolute  font-bold text-xs ">
                typeing
              </h5>
            ) : (
              ""
            )}

            <img
              className="rounded-full object-cover w-12 h-12 "
              src={firendData.avatar || avatar}
              alt="reciverImg"
            />
          </div>

          {/* user name */}
          <h1 className="text-xl absolute left-1/2 -translate-x-1/2  font-bold ">
            {firendData.name}
          </h1>

          {/* user status */}
          <OnlineStatus online={online} />
        </div>

        {/* Masseages container */}
        <div className=" overflow-y-scroll overflow-x-hidden shadow-cyan-300 shadow-inner     bg-black bg-opacity-60 rounded-md my-3 h-full lg:w-3/4 w-full">
          {msgs &&
            msgs.map((msg, i) => (
              <div key={msg._id || i}>
                <Msg {...msg} />
              </div>
            ))}
          <div ref={scrollDown}></div>
        </div>

        {/* form container */}
        <form
          onSubmit={sendMsg}
          className="flex  lg:w-3/4 w-full justify-between"
        >
          <input
            type="text"
            value={msgContent}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={startTyping}
            onKeyUp={stopTyping}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
            placeholder="Enter Your Messag"
          />

          <input
            type="submit"
            className="ms-10 bg-cyan-800 px-3 text-white font-bold rounded-2xl"
            value="Send"
          />
        </form>
      </div>
    </section>
  );
}
