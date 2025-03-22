import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "../style/Login.css"
import { CustomBaseUrl } from './CustomBaseUrl.js';
export const Inactive = () => {
  const [student, setStudent] = useState({
    sno: "", roomno: "", rollno: "", name: "", class: "", dept: "",
    email: "", address: "", city: "", phno: "", parentphno: "",
    dob: "", year: "", status: "",
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get(`/std/update/${id}`, {
          headers: { token },
        });
        setStudent(response.data.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
        enqueueSnackbar("Student FetchData Failed...", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  const updateStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await CustomBaseUrl.put(
        `/std/updateStatus/${id}`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setStudent((prevStudent) => ({
          ...prevStudent,
          status: prevStudent.status === "Active" ? "Inactive" : "Active",
        }));
        enqueueSnackbar("Status updated successfully!", { variant: "success" });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      enqueueSnackbar("Failed to update status.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container flex justify-center items-center min-h-screen">
      <div className="shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6 bg-black bg-opacity-45">
        {/* Left Section - Student Details */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center ">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <ul className="space-y-2">
                  <li><strong>Sno :</strong> {student.sno}</li>
                  <li><strong>Name :</strong> {student.name}</li>
                  <li><strong>Room :</strong> {student.roomno}</li>
                  <li><strong>Reg No :</strong> {student.rollno}</li>
                  <li><strong>Class :</strong> {student.class}</li>
                  <li><strong>Department :</strong> {student.dept}</li>
                  <li><strong>DOB :</strong> {student.dob}</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li><strong>Email :</strong> {student.email}</li>
                  <li><strong>Address :</strong> {student.address}</li>
                  <li><strong>City :</strong> {student.city}</li>
                  <li><strong>Phone No: </strong> {student.phno}</li>
                  <li><strong>Parent Phone No :</strong> {student.parentphno}</li>
                  <li><strong>Year : </strong> {student.year}</li>
                  <li><strong>Status :</strong> <span className={`px-2 py-1 rounded ${student.status === "Active" ? "text-green-500 text-lg font-semibold" : "text-red-500 text-lg font-semibold"}`}>{student.status}</span></li>
                </ul>
              </div>
            </div>
          )}
        </div>

      
        <div className="flex justify-center items-center">
          <button 
            className={`px-6 py-3 rounded text-white font-bold transition duration-300 ${student.status === "Active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`} 
            onClick={updateStatus}
          >
            {student.status === "Active" ? "Set Inactive" : "Set Active"}
          </button>
        </div>
      </div>
    </div>
  );
};
