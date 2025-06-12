import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/auths/authSlice";
import "../styles/logreg.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = formData;
  const { isLoading, isError, isSuccess, user, message } = useSelector(
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
  }, [isLoading, isError, isSuccess, message, dispatch, user, navigate]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <section className="main-container">
      <section className="form-cont">
        <section className="heading">
          <h1>Welcome Back</h1>
          <p>Log in to your account</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Log In</button>
            </div>
            <p>Don't have an account? <a href="/register">sign up now</a></p> 
          </form>
        </section>
      </section>
    </section>
  );
}
