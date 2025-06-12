import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auths/authSlice";
import "../styles/logreg.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password do not match");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };
  return (
    <section className="main-container">
      <section className="form-cont" style={{ height: 500 }}>
        <section className="heading">
          <h1>Create An Account</h1>
          <p>Get started absolutely fun</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm password"
                value={password2}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Create Account</button>
            </div>
            <p>
              Already have an account? <a href="/login">sign in</a>
            </p>
          </form>
        </section>
      </section>
    </section>
  );
}
