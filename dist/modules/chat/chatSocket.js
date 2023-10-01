"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let users = [];
function chatSocket(io) {
    io.on("connection", (socket) => {
        console.log("connect");
        socket.on("addUser", (userId) => {
            userId && addUser({ userId, socketId: socket.id });
            io.emit("online", users);
            // console.log("add user", { users });
        });
        socket.on("msg", (data) => {
            const user = getUser(data.to)?.socketId;
            // console.log(data);
            io.to(String(user)).emit("msg", data);
            // console.log({ user, data });
        });
        socket.on("typeing", (data) => {
            const user = getUser(data.userId)?.socketId;
            io.to(String(user)).emit("typeing", { status: true });
        });
        socket.on("stopTypeing", (data) => {
            const user = getUser(data.userId)?.socketId;
            // console.log("st", user);
            io.to(String(user)).emit("stopTypeing", { status: false });
        });
        socket.on("newChat", (data) => {
            const user = getUser(data.reciver)?.socketId;
            io.to(String(user)).emit("newChat", data);
        });
        socket.on("disconnect", () => {
            removeUser(socket.id);
            io.emit("online", users);
            console.log("disconnect");
        });
    });
}
exports.default = chatSocket;
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
const addUser = ({ userId, socketId }) => {
    !users.find((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
//# sourceMappingURL=chatSocket.js.map