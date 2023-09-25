import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Notfound from "../images/404.png";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-6xl text-center font-bold my-5 tracking-wider text-gray-400">
          ERROR 404
        </h1>
        <img className="block m-auto mb-4" src={Notfound} alt="Not Found" />
        <p className="text-center text-3xl font-bold text-gray-400">
          Page Not Found
        </p>
      </div>
    </>
  );
}
