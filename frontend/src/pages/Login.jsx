import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        "https://mernstack-doctor-web-app.onrender.com/api/v1/auth/login",
        formData
      );

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.data.token);

        // Redirect to the user profile page
        navigate("/userpage");
      } else {
        // Handle cases where the response doesn't contain a token
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display specific error message returned by the server
        setError(error.response.data.message);
      } else {
        // Fallback error message for unexpected errors
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="px-5 lg:px-0 ">
      <div className="w-full px-6 max-w-[570px]   mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🍕
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          {error && (
            <div className="mb-5 text-red-500 text-center">{error}</div>
          )}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
            />
          </div>

          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPasswordChange}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-textColor">
              Show Password
            </label>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}{" "}
              {/* Show different text when loading */}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
