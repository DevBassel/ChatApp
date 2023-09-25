import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!user) navigate("/login");
    if (!user?.verify) navigate("/verify");
  }, [navigate, user]);
  return (
    <>
      <Navbar />
      <h1 className="text-5xl text-center">Profile</h1>
    </>
  );
}
