import React from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"

export default function Navbar() {
  const [accountOpen, setAccountOpen] = useState(false);
  const openAcc = () => setAccountOpen(true);
  const closeAcc = () => setAccountOpen(false);
  return (
    <nav>
      <div
        className="popup"
        style={{ width: accountOpen ? "100%" : "0" }}
        onClick={closeAcc}
      >
        <span onClick={closeAcc}>✘</span>
        <Link to="/register" onClick={closeAcc}>
          <b>
            <IoPersonAdd /> Register
          </b>
        </Link>
        <Link to="/login" onClick={closeAcc}>
          <b>
            <FaSignInAlt /> Log In
          </b>
        </Link>
        <Link>
          <b>
            <FaSignOutAlt /> Log Out
          </b>
        </Link>
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
