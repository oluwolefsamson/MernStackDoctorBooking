import React, { useState } from "react";
import doctorSign from "../../src/assets/images/doctorSign.png";
import profile from "../../src/assets/images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { DotLoader, HashLoader } from "react-spinners";
import axios from "axios";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    specialization: "",
    qualifications: "",
    experiences: "",
    timeSlots: "",
    reviews: "",
    gender: "male",
    role: "doctor",
    education: [
      {
        institution: "",
        startYear: "",
        endYear: "",
      },
    ],
  });

  const [specializations] = useState([
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
  ]); // Example options
  const [qualifications] = useState(["MBBS", "MD", "DNB"]); // Example options
  const [experiences] = useState(["1 year", "3 years", "5 years"]); // Example options

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData({ ...formData, education: newEducation });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const handleRemoveEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    setImageLoading(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: response.data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!isValidPassword(formData.password)) {
      setLoading(false);
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number."
      );
      return;
    }

    try {
      const response = await axios.post(
        `https://mernstackdoctorbooking.onrender.com/api/v1/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Doctor account created successfully.");
        navigate("/doctorlogin");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          navigate("/doctorlogin");
        } else if (error.response.status === 400) {
          alert("Doctor already exists. Please log in.");
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={doctorSign}
                alt="Signup"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create a <span className="text-primaryColor">Doctor</span> Account
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="name"
                />
              </div>

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
                  autoComplete="new-password"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-headingColor text-[15px] leading-7"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-headingColor text-[16px] leading-7 mb-2">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-headingColor text-[16px] leading-7 mb-2">
                  Qualifications
                </label>
                <select
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                >
                  <option value="">Select Qualifications</option>
                  {qualifications.map((qual, index) => (
                    <option key={index} value={qual}>
                      {qual}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-headingColor text-[16px] leading-7 mb-2">
                  Experience
                </label>
                <select
                  name="experiences"
                  value={formData.experiences}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                >
                  <option value="">Select Experience</option>
                  {experiences.map((exp, index) => (
                    <option key={index} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={formData.photo || profile}
                    alt="Avatar"
                    className="w-full rounded-full"
                  />
                </figure>

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    accept=".jpg, .png"
                    onChange={handleImageUpload}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    {imageLoading ? (
                      <HashLoader
                        size={20}
                        color="white"
                        style={{ marginLeft: "20px" }}
                      />
                    ) : (
                      "Upload Photo"
                    )}
                  </label>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0066ff] text-white rounded-lg hover:bg-[#0050d4] disabled:opacity-50"
                >
                  {loading ? (
                    <DotLoader color="#ffffff" size={20} />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-headingColor text-[16px] leading-7">
                  Already have an account?{" "}
                  <Link to="/doctorlogin" className="text-primaryColor">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSignup;
