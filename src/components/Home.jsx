import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpeg";

const Home = () => {
  const navigate = useNavigate();

  
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
              <p className="border-bottom">Please login or signup first.</p>
            </div>
            <div className="card-body text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="btn btn-primary mx-2"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="btn btn-primary mx-2"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;