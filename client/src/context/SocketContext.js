import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (user) {
      const newSocket = io();

      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, []);

  useEffect(() => {
    socket?.on("online", (users) => setActiveUsers(users));
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
}
