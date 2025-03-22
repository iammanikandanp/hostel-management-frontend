import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all"; 

import image from "../assets/img/images.png";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

gsap.registerPlugin(TextPlugin);

const OtpVerify = () => {
  const [otp, setOtp] = useState(""); 
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.to(titleRef.current, { text: "Erode Arts and Science College", duration: 2, ease: "power1.out" });
    gsap.to(subtitleRef.current, { text: "Hostel Management", duration: 2, delay: 2, ease: "power1.out" });
    gsap.fromTo(formRef.current, { y: "50px", opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" });
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    
    const activationToken = localStorage.getItem("activationToken");
    
    if (!activationToken) {
      enqueueSnackbar("Activation token not found.", { variant: "error" });
      return;
    }

    try {
      const response = await CustomBaseUrl.post(
        "/std/stdverify",
        {
          otp,
          activationToken,
        }
      );

      enqueueSnackbar(response.data.message, { variant: "success" });
      localStorage.removeItem("activationToken"); 
      navigator('/');

    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Verification failed.", { variant: "error" });
    }
  };

  return (
    <div className="login-container h-screen flex flex-col md:flex-row items-center justify-center p-6">
      
      <div className="text-center md:text-left mb-6 md:mb-0">
        <img src={image} alt="logo" className="mx-auto md:mx-24 w-32 md:w-40" />
        <h1 ref={titleRef} className="text-2xl md:text-4xl text-white font-bold"></h1>
        <h3 ref={subtitleRef} className="text-lg md:text-2xl text-white font-semibold"></h3>
      </div>

      
      <div ref={formRef} className="opacity-0 w-full max-w-md p-6 rounded-lg">
        <form onSubmit={handleVerify} className="login-form">
          <h2 className="text-center mb-5 font-bold text-xl">Verify OTP</h2>

          <div className="form-group">
            <label className="font-semibold">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength="6"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center tracking-widest text-lg font-semibold"
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
