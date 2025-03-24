import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import gsap from "gsap";
import "../style/Outpass.css";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const StdComplaint = () => {
  const [student, setStudent] = useState({
    sno: "",
    roomno: "",
    name: "",
    date: "",
    subject: "",
    detail: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current, {
      opacity: 0,
      y: 50
    },{
        opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }
);
gsap.fromTo("input",{opacity:0,y:20},{opacity:1,y:0,duration:1,stagger:0.5})

    const fetchingStdDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/fetchingstudent", {
          headers: { token: token },
        });

        if (!response) {
          return enqueueSnackbar("Invalid Student!", { variant: "error" });
        }
        enqueueSnackbar(response.data.message, { variant: "success" });
        setStudent(response.data.data);
      } catch (error) {
        console.log("Student fetch error:", error);
        enqueueSnackbar("Invalid Student!", { variant: "error" });
      }
    };
    fetchingStdDetails();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await CustomBaseUrl.post("/std/stdcomplaint", student, {
        headers: { "Content-Type": "application/json", token: token },
      });

      if (!response) {
        enqueueSnackbar("Failed to Send Your Complaint!", { variant: "error" });
      }
      enqueueSnackbar(response.data.message, { variant: "success" });
      navigate("/stdhome");
    } catch (error) {
      console.log("Complaint Request Error:", error);
      enqueueSnackbar("Failed to send the complaint. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center outpass p-4">
      <div ref={formRef} className="bg-white bg-opacity-40 shadow-lg rounded-lg max-w-4xl w-full p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Complaint Form</h2>

        {loading && (
           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
           <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
         </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-3">
                <label className="block font-medium text-white" htmlFor="date">Date</label>
                <input type="date" name="date" id="date" onChange={handleChange} value={student.date} required className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-3">
                <label className="block font-medium text-white" htmlFor="sno">Student Number</label>
                <input type="text" name="sno" id="sno" placeholder="Enter your Student Number" onChange={handleChange} value={student.sno} required className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-3">
                <label className="block font-medium text-white" htmlFor="roomno">Room Number</label>
                <input type="text" name="roomno" id="roomno" placeholder="Enter your Room Number" onChange={handleChange} value={student.roomno} required className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300" />
              </div>
            </div>

            <div>
              <div className="mb-3">
                <label className="block font-medium text-white" htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter your Name" onChange={handleChange} value={student.name} required className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-3">
                <label className="block font-medium text-white" htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" placeholder="Enter your Subject" onChange={handleChange} value={student.subject} required className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300" />
              </div>

              <div className="mb-3">
                <label className="block font-medium text-white" htmlFor="detail">Issue</label>
                <textarea name="detail" id="detail" placeholder="Explain your Issue..." onChange={handleChange} value={student.detail} required rows={4} className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-300"></textarea>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};




