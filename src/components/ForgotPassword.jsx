import React, { useState } from "react";
import { API } from "./global";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Get Email ID from the User
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
  };

  // On submit send an email for Password reset if a valid Email ID is provided
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/forgot-password`, { email });
      
      setMessage(response.data.status); // Success Message of Password reset email
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
        <div className="col col-md-4 col-sm-6">
          <div className="card">
            <div className="card-header border-0 bg-white">
              <div className="fs-2">Forgot Password</div>
              <span>Please enter your Email ID to reset the password</span>
            </div>
            <div className="card-body">
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
                    onChange={handleChange}
                    className="form-control"
                    aria-describedby="email-Id"
                  />
                </div>
                <div className="mb-3">
                  {message === "Password reset email sent" ? (
                    <span className="d-block badge rounded-pill text-bg-success px-5 w-100 form-control">
                      {message}
                    </span>
                  ) : (
                    message && (
                      <span className="d-block badge rounded-pill text-bg-danger px-5 w-100 form-control">
                        {message}
                      </span>
                    )
                  )}
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

export default ForgotPassword;