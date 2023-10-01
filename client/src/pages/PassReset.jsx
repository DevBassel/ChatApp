import React, { useState } from "react";
import Input from "../components/Input";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { addError } from "../featchers/error/errorSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

export default function RESetPass() {
  const { token } = useParams();
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [userData, setData] = useState({
    password: "",
    password2: "",
  });
  const getData = ({ target }) =>
    setData({ ...userData, [target.name]: target.value });

  const resetPass = async (e) => {
    e.preventDefault();
    // check input is not empty
    if (userData.password.trim() && userData.password2.trim()) {
      if (userData.password === userData.password2) {
        if (passwordPattern.test(userData.password)) {
          try {
            // send requset to reset password
            const res = await axios.post(`/api/auth/reset-password/${token}`, {
              newPassword: userData.password,
            });

            // if success
            if (res.data.success)
              Swal.fire({
                title: "Password Is Reset ^_^",
                icon: "success",
              }).then((r) => {
                if (r.isConfirmed) navigate("/login");
              });
          } catch (error) {
            // popup error
            Swal.fire({
              title: "Token Is Expired",
              icon: "error",
            }).then((r) => {
              if (r.isConfirmed) navigate("/login");
            });
            //
          }
        } else
          dispatch(
            addError(
              "Min 8 chars,  one uppercase letter, one lowercase letter, one number and one special character"
            )
          );
      } else dispatch(addError("password dont't match"));
    } else dispatch(addError("not valid form"));
  };

  return (
    <section className="bg-gradient-to-tl h-screen absolute p-4 w-full from-sky-500 to-indigo-500">
      <div className="bg-black bg-opacity-50 backdrop-blur-md w-10/12 md:w-2/5 m-auto leading-10  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 font-bold rounded-2xl">
        <h1 className="capitalize text-center font-bold text-3xl border-b-2 border-indigo-500 text-indigo-500">
          {" "}
          reset password
        </h1>
        <p className="text-center font-bold text-white tracking-wider">
          Token is valid 5 minutes ^_^
        </p>
        <form onSubmit={resetPass} className="w-full m-auto">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="New password"
            name="password"
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
            name="password2"
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
    </section>
  );
}
