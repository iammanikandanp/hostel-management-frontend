import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "../style/Outpass.css"
import { CustomBaseUrl } from './CustomBaseUrl.js';
export const OutPass = () => {
    const [student, setStudent] = useState({
        sno: "",
        roomno: "",
        name: "",
        email: "",
        timeout: "",
        timein: "",
        intimeap: "",
        outtimeap: "",
        date: "",
        phno: "",
        parentphno: "",
        detail: "",
    });
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const checkout = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await CustomBaseUrl.get(`/std/fetchs/${student.sno}`, {
                headers: { token: token }
            });
            
            if (!response.data || !response.data.data) {
                enqueueSnackbar("Student Data is Unavailable", { variant: "error" });
                return;
            }
            enqueueSnackbar("Student data fetched successfully!", { variant: "success" });
            setStudent(response.data.data);
        } catch (error) {
            console.error("Data Fetching Error:", error);
            enqueueSnackbar("The student is unavailable for this Sno. Please provide a valid serial number.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await CustomBaseUrl.post(
                "/std/adminapproveoutpass",
                student,
                { headers: { "Content-Type": "application/json", token: token } }
            );
            
            if (response) {
                enqueueSnackbar(response.data.message, { variant: "success" });
                setTimeout(() => navigate("/stdoutpassview"), 2000);
            } else {
                enqueueSnackbar("Failed to send the outpass request.", { variant: "error" });
            }
        } catch (error) {
            console.error("Outpass Request Error:", error);
            enqueueSnackbar("Failed to send the outpass request. Please try again.", { variant: "error" });
        } finally{
          setLoading(ture)
        }
    };

    
        return (
          <div className="outpass">
          <div className=" max-w-4xl mx-auto md:mt-20 p-6 bg-black bg-opacity-40 shadow-lg rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="  "
          >
            
            {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          </div>
        )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
              
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-green-500">Student Details</h2>
                <div className="flex">
                  <input
                    type="text"
                    name="sno"
                    value={student.sno}
                    placeholder="Enter Sno"
                    onChange={handleChange}
                    className="w-3/4 p-2 border rounded-md outline-green-600"
                    required
                  />
                  <button
                    type="button"
                    className="w-1/4 ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={checkout}
                  >
                    Search
                  </button>
                </div>
                <div className="grid grid-cols gap-4">
                  <input
                    type="text"
                    name="roomno"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Room No"
                    value={student.roomno}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    value={student.name}
                    required
                  />
                </div>
                <div className="grid grid-col gap-4">
                  <input
                    type="number"
                    name="phno"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Phone Number"
                    value={student.phno}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="parentphno"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Parent Phone Number"
                    value={student.parentphno}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
      
              
              <div className="space-y-6">
                <h2 className="text-xl font-bold  text-green-500">OutPass Details</h2>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md outline-green-600"
                  placeholder="Enter Email"
                  value={student.email}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols gap-4">
                  <div className="">


                  <label htmlFor="outtime" className='block  text-green-500'>OutTime</label>
                  <div className="grid grid-cols-2">

                  <input
                    type="time"
                    name="timeout"
                    className="w-[200px] p-2 border rounded-md mr-3 mb-2 outline-green-600"
                    id='outtime'
                    value={student.timeout}
                    onChange={handleChange}
                    required
                  />
                   <select name="outtimeap" id="am" className='w-[200px] p-2 border rounded-md outline-green-600' onChange={handleChange}
                            value={student.outtimeap} >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                 </select>
                 </div>
                 </div>
                 <div className="grid">
                 <label htmlFor="intime" className='block  text-green-500'>InTime</label>
                 <div className="grid grid-cols-2">
                  <input
                    type="time"
                    name="timein"
                    className="w-[200px] p-2 border rounded-md mr-3 outline-green-600"
                    id='intime'
                    value={student.timein}
                    onChange={handleChange}
                    required
                  />
                    <select name="intimeap" id="pm" className='w-[200px] p-2 border rounded-md outline-green-600' onChange={handleChange}
                            value={student.intimeap} >
                    <option value="">AM/PM</option>

                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                        </div>
                        </div>
                </div>
                <input
                  type="date"
                  name="date"
                  className="w-full p-2 border rounded-md outline-green-600"
                  value={student.date}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="detail"
                  className="w-full p-2 border rounded-md outline-green-600"
                  placeholder="Enter your Reason..."
                  rows="3"
                  value={student.detail}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
      
            
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Out Pass
              </button>
            </div>
          </form>
          </div>
          </div>
        );
      }
      
    