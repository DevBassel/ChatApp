import { useDispatch, useSelector } from "react-redux";
import { errReset } from "../featchers/error/errorSlice";
import { useEffect } from "react";

export default function Popup(props) {
  const { msg } = useSelector((s) => s.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        dispatch(errReset());
      }, 2000);
    }
  }, [dispatch, msg]);
  return (
    msg && (
      <div
        className={`popup ${
          msg ? "active" : ""
        } fixed   capitalize  top-3/4   -translate-yg-1/2  overflow-hidden  z-30 bg-red-500  p-3 rounded-lg bg-opacity-95 text-white font-bold text-xl`}
      >
        {msg}
      </div>
    )
  );
}
