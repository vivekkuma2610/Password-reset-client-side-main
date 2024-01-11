import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Handle the input value
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle Signup and allow user to LogIn directly
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(`${API}/signup`, payload);

      setMessage(response.data.status); // Signup success message set

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/");
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
            <div className="card-header border-0 bg-white d-flex justify-content-between">
              <div className="signup fs-2">Signup</div>
              <div
                className="login fs-6 mt-2"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
            </div>
            <div className="card-body">
              {/* Sign up form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    aria-describedby="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    aria-describedby="email-id"
                    value={email}
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
                    className="form-control"
                    value={password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <span
                    className={`${message} ? "d-block badge rounded-pill text-bg-danger px-5 w-100 form-control" : "d-none"`}
                  >
                    {message}
                  </span>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;