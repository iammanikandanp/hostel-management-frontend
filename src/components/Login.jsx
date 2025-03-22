import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/Login.css";
import image from "../assets/img/images.png";
import { useSnackbar } from "notistack";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

gsap.registerPlugin(TextPlugin);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.to(titleRef.current, { text: "Erode Arts and Science College", duration: 2, ease: "power1.out" });
      gsap.to(subtitleRef.current, { text: "Hostel Management", duration: 2, delay: 2, ease: "power1.out" });
      gsap.fromTo(formRef.current, { y: "50px", opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" });
    }
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await CustomBaseUrl.post("/std/login", {
        email,
        password
      });
  
      if (response.status === 200) {
        const { user, token, message } = response.data;
        localStorage.setItem("token", token);
        enqueueSnackbar(message, { variant: "success" });
  
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/adminhome");
          } else if (user.role === "student") {
            navigate("/stdhome");
          } else {
            enqueueSnackbar("Invalid user role.", { variant: "error" });
          }
        }, 2000);
      } else {
        enqueueSnackbar(response.data.message || "Login failed.", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };
  

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img src={image} alt="Loading" className="rounded-xl" />
        </div>
      ) : (
        <div className="login-container md:h-screen h-auto  flex flex-col md:flex-row items-center justify-center p-6">
          
          <div className="text-center md:text-left mb-6 md:mb-0">
            <img src={image} alt="logo" className="mx-auto md:mx-32 w-32 md:w-40" />
            <h1 ref={titleRef} className="text-2xl md:text-4xl text-white font-bold"></h1>
            <h3 ref={subtitleRef} className="text-lg md:text-2xl text-white font-semibold"></h3>
          </div>

          
          <div ref={formRef} className="opacity-0 w-full max-w-md p-3  md:p-6 rounded-lg">
            <form onSubmit={handleLogin} className="login-form sm-w-[350px]">
              <h2 className="text-center font-medium text-xl text-blue-900 mb-4">Login</h2>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
              <p className="text-sm mt-2 text-center">
                Do you haven't an account?{" "}
                <Link to="/reg" className="text-green-700 font-bold text-base">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
