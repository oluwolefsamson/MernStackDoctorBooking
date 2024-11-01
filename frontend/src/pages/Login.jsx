import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import axios from "axios";
import loginImg from "../assets/images/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient", // Default role
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://mernstackdoctorbooking.onrender.com/api/v1/auth/login`,
        formData
      );

      if (response.data.token) {
        const userRole = response.data.role;

        if (userRole === "patient") {
          localStorage.setItem("authToken", response.data.token);
          navigate("/userpage", { replace: true });
        } else {
          setError("Only patients are allowed to log in.");
        }
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex items-center justify-center px-5 lg:px-0 min-h-screen"
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full py-6 px-6 max-w-[570px] bg-white mx-auto rounded-lg shadow-2xl md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello Patient! <span className="text-primaryColor">Welcome</span> Back
          🍕
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
              className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-5">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
              autoComplete="current-password"
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
              disabled={loading}
            >
              {loading ? <DotLoader size={25} color="white" /> : "Login"}
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
