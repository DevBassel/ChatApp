import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../featchers/auth/authActions";
import { authReset } from "../featchers/auth/authSlice";
import { addError } from "../featchers/error/errorSlice";

export default function Register() {
  const [avatar, setAvatar] = useState({});

  const [userData, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((s) => s.auth);
  // regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // set form data in state
  const getData = ({ target }) =>
    setData({ ...userData, [target.name]: target.value });

  if (error) dispatch(addError(error));

  if (error) {
    if (error.includes("name_1 dup")) dispatch(addError("userName is used"));
    if (error.includes("email_1 dup")) dispatch(addError("email is used"));
  }

  useEffect(() => {
    if (user) {
      if (!user.verify) navigate("/verify");
      else navigate("/");
    }

    return () => dispatch(authReset());
  }, [dispatch, navigate, user]);

  const fileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // submit form
  function submit(event) {
    event.preventDefault();
    if (
      emailPattern.test(userData.email) &&
      passwordPattern.test(userData.password)
    ) {
      // register logic
      if (userData.password === userData.password2) {
        const formData = new FormData();

        formData.append("avatar", avatar);
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);

        dispatch(register(formData));
        navigate("/verify");
      } else dispatch(addError("Passwords do not match."));
      console.log("form is valid", userData);
    } else {
      dispatch(addError("form not valid"));
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          create a new account
        </h2>
      </div>

      <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submit}>
          <Input label="name" type="text" value={userData.name} fun={getData} />
          <p className=" text-red-600 text-center font-bold">
            {error.split(" ").includes("name_1") ? "name is used" : ""}
          </p>
          <Input
            label="email"
            type="email"
            value={userData.email}
            fun={getData}
          />
          <p className=" text-red-600 text-center font-bold">
            {error.split(" ").includes("email_1") ? "email is used" : ""}
          </p>
          <Input
            type="file"
            label="avatar"
            id="avatar"
            accept=".jpg, .jpeg, .png"
            fun={fileChange}
            cls="file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-4 file:py-2 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
          />
          {/* {avatar && <img src= alt="xvc" />} */}
          <Input
            label="password"
            type={showPass ? "text" : "password"}
            fun={getData}
            value={userData.password}
            ex={
              <div
                className=" absolute top-0 right-1 text-4xl text-indigo-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <BiShow /> : <BiSolidHide />}
              </div>
            }
          />
          <Input
            label="password2"
            type={showPass ? "text" : "password"}
            fun={getData}
            value={userData.password2}
            ex={
              <div
                className=" absolute top-0 right-1 text-4xl text-indigo-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <BiShow /> : <BiSolidHide />}
              </div>
            }
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
          <div className="text-sm flex capitalize justify-between">
            <Link
              to="/login"
              className="flex w-52 m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              login?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
