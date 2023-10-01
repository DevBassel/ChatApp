import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe, logOut } from "../featchers/auth/authActions";
import avatar from "../images/avatar.svg";
import {
  BiHomeCircle,
  BiLogOut,
  BiMailSend,
  BiSolidUser,
  BiUser,
} from "react-icons/bi";
import axios from "axios";
import { addError } from "../featchers/error/errorSlice";

export default function Navbar() {
  // const { socket } = useContext(SocketContext);

  const [show, setshow] = useState(false);
  const showMenu = () => setshow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((s) => s.auth);
  const [checkImg, setcheckImg] = useState(404);

  useEffect(() => {
    if (error) {
      dispatch(addError(error));
      if (error.includes("User Not Found") || error.includes("Unauthorized")) {
        dispatch(logOut());
      }
    }

    if (!user) navigate("/login");
    if (!user?.verify) navigate("/verify");
  }, [dispatch, error, navigate, user]);

  useEffect(() => {
    dispatch(getMe());

    axios
      .get(user?.avatar)
      .then((res) => setcheckImg(res.status))
      .catch((err) => setcheckImg(404));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const navList = [
    {
      name: "Home",
      icone: <BiHomeCircle />,
      fun: () => navigate("/"),
    },
    {
      name: "Profile",
      icone: <BiSolidUser />,
      fun: () => navigate(`/me/${user?._id}`),
    },
    {
      name: "log out",
      icone: <BiLogOut />,
      fun: () => {
        dispatch(logOut());
      },
    },
  ];

  return (
    <nav className="bg-white  border-gray-200 px-9 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <Link to="/" className="text-lime-50 text-2xl">
          Betangan🍆
        </Link>

        <div className="flex items-center md:order-2 font-bold">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 relative  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onMouseOver={showMenu}
          >
            <img
              className="w-12 h-12 rounded-full object-cover"
              onMouseOut={() => setshow(false)}
              src={checkImg === 200 ? user?.avatar : avatar}
              alt="userPhoto"
            />
            <div
              onMouseOut={() => setshow(false)}
              className={`z-50 absolute nav ${
                show ? "" : "hidden"
              } left-0 top-7 -translate-x-3/4   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="px-4 py-3 text-left text-xl">
                <span className="flex  items-center text-gray-900 dark:text-white">
                  <span className="me-2 ">
                    <BiUser />
                  </span>
                  Hi,{" "}
                  <span className="text-sky-500 ms-3 tracking-wider">
                    {user?.name}
                  </span>
                </span>
                <span className="flex text-sm  items-center text-gray-500 truncate dark:text-gray-400">
                  <span className="me-2 text-base">
                    <BiMailSend />
                  </span>
                  {user?.email}
                </span>
              </div>
              <ul className="py-2 capitalize">
                {navList.map((item, i) => (
                  <li
                    key={i}
                    onClick={item.fun}
                    className="px-4 py-2 text-lg text flex items-center font-bold   text-gray-700 hover:bg-blue-600 dark: dark:text-gray-200 dark:hover:text-white"
                  >
                    <span className="me-5">{item.icone}</span> {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
