import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Handle the input values
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle LogIn and navigate the user to the Home page
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${API}/login`, payload);

      setMessage(response.data.status);

      const token = response.data.token;
      localStorage.setItem("x-auth-token", token);

      if (localStorage.getItem("x-auth-token")) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;

        // display all validation errors to the user
        const errorMessages = validationErrors.map((error) => error.msg);

        setMessage(errorMessages.toString());
      } else {
        // Handle other error scenarios
        setMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col col-md-4 col-sm-8">
          <div className="card">
            <div className="card-header border-0 bg-white fs-2">Login</div>
            <div className="card-body">
              {/* Login form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="form-control"
                    aria-describedby="emailID"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <span
                    className={
                      message
                        ? message === "User logged in successfully!"
                          ? "d-block badge rounded-pill text-success px-5 w-100 form-control"
                          : "d-block badge rounded-pill text-danger px-5 w-100 form-control"
                        : "d-none"
                    }
                  >
                    {message}
                  </span>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <div
                  className="forgot-password fs-6 mt-2 float-end"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;