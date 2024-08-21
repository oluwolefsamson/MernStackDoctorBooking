import React from "react";
import { Link } from "react-router-dom";
import chooseImg from "../../src/assets/images/profile.png"; // Adjust the path as needed

const ChoosePage = () => {
  return (
    <section className="px-5 xl:px-0 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Select Your Registration Type
        </h2>
        <img
          src={chooseImg}
          alt="Choose"
          className="w-full h-auto mb-6 rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="block py-3 px-6 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Patient Login
          </Link>
          <Link
            to="/doctorlogin"
            className="block py-3 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Doctor Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChoosePage;
