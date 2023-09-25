import mongoose, { Schema } from "mongoose";

const msgSchema: Schema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: [true, "bad data "],
    },
  },
  {
    timestamps: true,
  }
);

const Msg = mongoose.model("msgs", msgSchema);
export default Msg;
