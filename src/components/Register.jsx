import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/img/images.png";
import { useSnackbar } from "notistack";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

gsap.registerPlugin(TextPlugin);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const navigation = useNavigate()

  const { enqueueSnackbar } = useSnackbar();

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
useEffect(() => {
    
      gsap.to(titleRef.current, { text: "Erode Arts and Science College", duration: 2, ease: "power1.out" });
      gsap.to(subtitleRef.current, { text: "Hostel Management", duration: 2, delay: 2, ease: "power1.out" });
      gsap.fromTo(formRef.current, { y: "50px", opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" });
    
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CustomBaseUrl.post("/std/adminregister", formData);
      console.log(response)
      enqueueSnackbar(response.data.message,{variant:"success"});
      if (response.data.activationToken) {
        localStorage.setItem("activationToken", response.data.activationToken);

      }
      
      navigation("/otp");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "An error occurred",{variant:"error"});
    }
  };

  return (
    <div className="login-container min-h-screen flex flex-col md:flex-row items-center justify-center pl-2 md:p-6">
              
              <div className="text-center md:text-left mb-6 md:mb-0">
                <img src={image} alt="logo" className="mx-auto md:mx-24 w-32 md:w-40" />
                <h1 ref={titleRef} className="text-2xl md:text-4xl text-white font-bold"></h1>
                <h3 ref={subtitleRef} className="text-lg md:text-2xl text-white font-semibold"></h3>
              </div>
    
              
              <div ref={formRef} className="opacity-0 w-full max-w-md  p-6  rounded-lg">
                <form onSubmit={handleSubmit} className="login-form">
                  <h2 className="text-center font-medium text-xl text-blue-900 mb-4">Add Admin</h2>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      required
                      className="w-full border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      required
                      className="w-full border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      required
                      className="w-full border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Add Admin
                  </button>
    
                </form>
              </div>
            </div>
  );
};

export default Register;
