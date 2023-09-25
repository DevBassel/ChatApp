import mongoose, { Schema } from "mongoose";

const chateSchema: Schema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    reciver: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chateSchema);
export default Chat;
