import { Server } from "socket.io";
interface User {
  userId: string;
  socketId: string;
}
let users: User[] = [];

export default function chatSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
      userId && addUser({ userId, socketId: socket.id });
      io.emit("online", users);
      // console.log("add user", { users });
    });

    socket.on("msg", (data) => {
      const user = getUser(data.to)?.socketId;
      console.log(data);
      io.to(String(user)).emit("msg", data);

      console.log({ users, user, data });
    });

    socket.on("typeing", (data) => {
      const user = getUser(data.userId)?.socketId;

      io.to(String(user)).emit("typeing", { status: true });
    });

    socket.on("stopTypeing", (data) => {
      const user = getUser(data.userId)?.socketId;
      io.to(String(user)).emit("stopTypeing", { status: false });
    });

    socket.on("newChat", (data) => {
      const user = getUser(data.reciver)?.socketId;
      io.to(String(user)).emit("newChat", data);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("online", users);
    });
  });
}

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

const addUser = ({ userId, socketId }: User) => {
  !users.find((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};
