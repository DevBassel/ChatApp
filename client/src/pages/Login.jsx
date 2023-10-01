import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../featchers/auth/authActions";
import { addError } from "../featchers/error/errorSlice";
import { authReset } from "../featchers/auth/authSlice";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../components/Loading";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, loading } = useSelector((s) => s.auth);

  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      if (!user?.verify) navigate("/verify");
      else navigate("/");
    }

    return () => dispatch(authReset());
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (error) {
      dispatch(addError(error));
    }
  });

  const [showPass, setShowPass] = useState(false);
  // regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // set form data in state
  const getData = ({ target }) =>
    setData({ ...userData, [target.name]: target.value });
  // submit form
  function submit(event) {
    event.preventDefault();

    // check validation form
    if (
      emailPattern.test(userData.email) &&
      passwordPattern.test(userData.password)
    ) {
      // login logic
      dispatch(login(userData));
    } else {
      dispatch(addError("email or password not valid"));
    }
  }

  const sendReset = () => {
    Swal.fire({
      title: "Reset Your Password ^_^",
      input: "email",
      inputLabel: "Enter Your Email",
      showCancelButton: true,
      inputValidator: (val) => {
        if (!emailPattern.test(val)) return "Enter Valid Email";
      },
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          const res = await axios.post(
            "/api/auth/forget-password",
            {
              email: r.value,
            },
            { withCredentials: true }
          );
          if (res.data.success) {
            Swal.fire({
              title: "Check Your Email",
              icon: "success",
              iconColor: "#4f46e5",
            });
          }
        } catch (error) {
          Swal.fire({
            title: error.response.data.error,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            login to your account
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => submit(e)}>
            <Input
              label="email"
              type="email"
              value={userData.email}
              fun={getData}
            />
            <Input
              label="password"
              type={showPass ? "text" : "password"}
              value={userData.password}
              fun={getData}
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
                Login
              </button>
            </div>
            <div className="text-sm flex capitalize justify-between">
              <Link
                onClick={sendReset}
                className=" font-bold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
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
