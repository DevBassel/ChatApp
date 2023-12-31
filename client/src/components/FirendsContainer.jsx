import React, { useEffect, useState } from "react";
import Firend from "./Firend";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../featchers/auth/authActions";
import socket from "../socket";

export default function FirendsContainer({ onlines }) {
  const API = "/api";
  const [firends, setFirends] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/users`, { withCredentials: true });
        setFirends(res.data);
      } catch (error) {
        if (error.response.data.error === "Unauthorized") {
          dispatch(logOut());
        }
      }
    })();
  }, [API, dispatch]);
  const startChat = ({ name, _id }) => {
    Swal.fire({
      title: `You Will Start Chat with ${name}`,
      showCancelButton: true,
    }).then(async (r) => {
      try {
        if (r.isConfirmed) {
          const res = await axios.post(
            `${API}/chat`,
            { recevierId: _id },
            { withCredentials: true }
          );

          const { sender, reciver } = res.data;
          socket.emit("newChat", {
            sender,
            reciver,
          });
          // go to chat
          navigate(
            `messenger/${res.data._id}-${
              reciver === user._id ? sender : reciver
            }`
          );
        }
      } catch (error) {
        Swal.fire({
          title: error.response.data.error,
        });
      }
    });
  };

  return (
    <section className="container m-auto  w-fit p-4 mb-4 overflow-x-scroll whitespace-nowrap    rounded-md bg-slate-300">
      <h3 className=" font-bold -mt-4 p-1 tracking-wide">users</h3>

      {firends &&
        firends.map((firend) => (
          <div
            key={firend._id}
            className="border cursor-pointer relative overflow-hidden border-slate-700 w-20 h-20 flex-1 me-2 inline-block rounded-lg"
            onClick={() => startChat(firend)}
          >
            <Firend {...{ ...firend, onlines }} />
          </div>
        ))}
    </section>
  );
}
