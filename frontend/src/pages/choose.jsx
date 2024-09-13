import React from "react";
import { Link } from "react-router-dom";
import chooseImg from "../../src/assets/images/choose.jpg"; // Path to the image

const ChoosePage = () => {
  return (
    <section className="px-5 xl:px-0 min-h-screen flex items-center justify-center bg-gray-100">
      {/* Card container */}
      <div
        className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 text-center"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8  fascinate-inline-regular">
          Select Your Login Type
        </h2>

        {/* Image */}
        <img
          src={chooseImg}
          alt="Choose"
          className="mb-8 rounded-lg"
          style={{
            height: "200px",
            width: "200px",
            objectFit: "cover", // Ensure the image fits nicely
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        {/* Login buttons */}

        <div className="w-full flex flex-col gap-6">
          {/* Admin Login */}
          <Link
            to="/adminlogin"
            className="block py-4 px-8 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Admin Login
          </Link>
          {/* Doctor Login */}
          <Link
            to="/doctorlogin"
            className="block py-4 px-8 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Doctor Login
          </Link>
          {/* Patient Login */}
          <Link
            to="/login"
            className="block py-4 px-8 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Patient Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChoosePage;
