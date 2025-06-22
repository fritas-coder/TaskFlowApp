import React from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logOut,reset} from "../features/auths/authSlice"
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [accountOpen, setAccountOpen] = useState(false);
  const openAcc = () => setAccountOpen(true);
  const closeAcc = () => setAccountOpen(false);
  const onLogOut =()=> {
    dispatch(logOut());
  dispatch(reset());
  navigate("/")
  }
  return (
    <nav>
      <div
        className="popup"
        style={{ width: accountOpen ? "100%" : "0" }}
        onClick={closeAcc}
      >
        <span onClick={closeAcc}>✘</span>
        {user ? (
          <Link onClick={onLogOut}>
            <b>
              <FaSignOutAlt /> Log Out
            </b>
          </Link>
        ) : (
          <>
            <Link to="/register" onClick={closeAcc}>
              <b>
                <IoPersonAdd /> Register
              </b>
            </Link>
            <Link to="/login" onClick={closeAcc}>
              <b>
                <FaSignInAlt /> Log In
              </b>
            </Link>{" "}
          </>
        )}
      </div>
      <a href="/">
        <h2>TaskFlow</h2>
      </a>

      <span onClick={openAcc} className="acc">
        <FaUser />
      </span>
    </nav>
  );
}
