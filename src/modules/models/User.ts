import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      min: [2, "name is to low"],
      unique: [true, "this name is exist"],
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "this email is exist"],
      validate: [(val: string) => emailPattern.test(val), "email not valid"],
    },
    password: {
      type: String,
      minlength: [6, "password length shoud be 6 chars"],
      required: [true, "password is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// hash password before save in database
UserSchema.pre("save", async function (next) {
  try {
    const hash = await bcrypt.hash(
      String(this.password),
      await bcrypt.genSalt(10)
    );
    this.password = hash;

    next();
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
