import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpeg";

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated when accessing a protected route
  const protectedRouteHandler = () => {
    if (!localStorage.getItem("x-auth-token")) {
      alert("Session has been expired");
      navigate("/login");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    // Clear the authentication token and any user-related data from localStorage
    localStorage.removeItem("x-auth-token");

    navigate("/login");
  };

  // Call the protectedRouteHandler to check if the user is authenticated
  useEffect(() => {
    protectedRouteHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 col-sm-12 text-center">
          <img src={image1} alt="Forgot Password" className="img-fluid" />
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card">
            <div className="card-header border-0 bg-white text-center">
              <h3>Password Reset Application</h3>
            </div>
            <div className="card-body text-center border-top">
              <div className="card-text mb-3">Welcome Home!</div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-primary mx-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;