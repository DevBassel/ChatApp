import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../featchers/error/errorSlice";
import { getMe, verfiyEmail } from "../featchers/auth/authActions";
import Navbar from "../components/Navbar";
import { authReset } from "../featchers/auth/authSlice";

export default function Verify() {
  const regex = /^\d{6}$/;
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, success } = useSelector((s) => s.auth);

  const getCode = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (user) {
      if (user.verify) navigate("/");
    } else navigate("/login");
  }, [navigate, user]);

  if (success) {
    dispatch(getMe());
    console.log(user);
  }

  if (error) {
    dispatch(addError(error));
    dispatch(authReset());
  }

  const submit = (e) => {
    e.preventDefault();
    if (regex.test(code)) {
      dispatch(verfiyEmail({ code }));
    } else dispatch(addError("not valid"));
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            check your email to verify it <br /> code is valid 2 minutes ^_^
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submit}>
            <div className=" w-36 m-auto">
              <Input type="text" value={code} max="6" fun={getCode} id="code" />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify
              </button>
              <span
                to="/login"
                className=" font-bold text-indigo-600 m-auto pt-8 text-center block  hover:text-indigo-500"
              >
                resend?
              </span>
            </div>
            <div className="text-sm flex capitalize justify-between">
              <Link
                to="/login"
                className=" font-bold text-indigo-600 hover:text-indigo-500"
              >
                Login?
              </Link>
              <Link
                to="/register"
                className=" font-bold text-indigo-600 hover:text-indigo-500"
              >
                register?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
