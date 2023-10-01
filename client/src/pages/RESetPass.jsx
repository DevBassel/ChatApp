import React, { useState } from "react";
import Input from "../components/Input";
import { BiShow, BiSolidHide } from "react-icons/bi";

export default function RESetPass() {
  const [showPass, setShowPass] = useState(false);
  const [userData, setData] = useState({
    current: "",
    password: "",
    password2: "",
  });

  const getData = ({ target }) =>
    setData({ ...userData, [target.name]: target.value });
  const resetPass = (e) => {
    e.preventDefault();
    console.log("password reset");
  };

  return (
    <div className="bg-slate-400 w-full leading-10 mt-6 p-4 font-bold rounded-2xl">
      <h1 className="capitalize text-center font-bold text-3xl border-b-2 border-indigo-500 text-indigo-500">
        {" "}
        reset password
      </h1>
      <form onSubmit={resetPass} className="w-80 m-auto">
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Current password"
          value={userData.current}
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
        <Input
          type={showPass ? "text" : "password"}
          placeholder="New password"
          value={userData.password}
          fun={getData}
          ex={
            <div
              className=" absolute top-0 cursor-pointer  right-1 text-4xl text-indigo-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <BiShow /> : <BiSolidHide />}
            </div>
          }
        />
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Re New password"
          value={userData.password2}
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
