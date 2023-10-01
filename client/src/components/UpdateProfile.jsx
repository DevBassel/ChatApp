import React, { useEffect, useState } from "react";
import Input from "./Input";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { addError } from "../featchers/error/errorSlice";
import { updateUserData } from "../featchers/user/userActions";
import { userReset } from "../featchers/user/userSlice";
import Loading from "../components/Loading";
import { getMe } from "../featchers/auth/authActions";

export default function UpdateProfile({ fun }) {
  const [showPass, setShowPass] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const { success, loading, userError } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const [userData, setData] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
  });

  useEffect(() => {
    if (success) {
      dispatch(userReset());
      dispatch(getMe());
    }
    if (userError) {
      dispatch(addError(userError));
    }
  }, [dispatch, success, userError]);

  const getData = ({ target }) =>
    setData({ ...userData, [target.name]: target.value });

  const update = (e) => {
    e.preventDefault();
    if (
      userData.name.trim() &&
      userData.email.trim() &&
      userData.password.trim()
    ) {
      const data = new FormData();
      data.append("avatar", avatar);
      data.append("name", userData.name);
      data.append("email", userData.email);
      data.append("password", userData.password);
      dispatch(updateUserData(data));
    } else {
      dispatch(addError("form not valid"));
    }
  };

  const fileChange = (e) => setAvatar(e.target.files[0]);

  return (
    <div className="fixed transition-all top-0 left-0 h-full w-full z-20 p-5 bg-black bg-opacity-60 flex items-center justify-center">
      {loading && <Loading />}
      <AiOutlineClose
        onClick={fun}
        className="fixed top-20 cursor-pointer text-white text-6xl"
      />
      <form
        onSubmit={update}
        className=" bg-slate-500 p-5 rounded-2xl w-full md:w-1/2 lg:w-1/3"
      >
        <Input
          type="file"
          label="avatar"
          id="avatar"
          accept="image/*"
          fun={fileChange}
          cls="file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-4 file:py-2 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
        />
        <Input
          type="name"
          label="name"
          placeholder="Current password"
          value={userData.name}
          fun={getData}
        />
        <Input
          type={showPass ? "text" : "password"}
          label="password"
          placeholder="Current password"
          value={userData.password}
          fun={getData}
          ex={
            <div
              className=" absolute top-0 cursor-pointer right-1 text-4xl text-indigo-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <BiShow /> : <BiSolidHide />}
            </div>
          }
        />
        <button
          type="submit"
          className="flex w-full justify-center mt-5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
