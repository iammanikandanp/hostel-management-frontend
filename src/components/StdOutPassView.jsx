import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import gsap from "gsap";
import "../style/Outpass.css"
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const StdOutPassView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("all");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/findstdoutpass", {
          headers: { token: token },
          params: { status },
        });
        setStudents(response.data.data);
        gsap.fromTo(".table-row", { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
      } catch (err) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      }
    };
    fetchData();
  }, [status]);

  

  return (
    <div className="outpass min-h-screen mx-auto p-4 md:py-24">
      <div className="flex flex-row  justify-between items-center gap-4 bg-gray-100 bg-opacity-40 p-4 rounded-lg shadow-md">
       
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-[200px] md:w-1/4"
        >
          <option value="all">All</option>
          <option value="Request">Request</option>
          <option value="Approved">Approved</option>
          <option value="Decline">Decline</option>
        </select>
        <Link
          to="/requeststdoutpass"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          OutPass
        </Link>
      </div>

      <h1 className="text-center text-white text-2xl font-bold my-6">OutPass Details</h1>

      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
              <th className="p-3">Index</th>
              <th className="p-3">Date</th>
              <th className="p-3">Sno</th>
              <th className="p-3">Room No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Out Time</th>
              <th className="p-3">In Time</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Parent Phone</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student._id} className="table-row bg-white border-b hover:bg-gray-100 transition">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">{student.date}</td>
                  <td className="p-3 text-center">{student.sno}</td>
                  <td className="p-3 text-center">{student.roomno}</td>
                  <td className="p-3 text-center">{student.name}</td>
                  <td className="p-3 text-center">{student.outtime} <span>{student.outtimeap}</span></td>
                  <td className="p-3 text-center">{student.intime} <span>{student.intimeap}</span></td>
                  <td className="p-3 text-center">{student.phno}</td>
                  <td className="p-3 text-center">{student.parentphno}</td>
                  <td className="p-3 text-center">{student.reason}</td>
                  <td className={`p-3 text-center font-bold 
                    ${student.status === "Approved" ? "text-green-600" : 
                    student.status === "Decline" ? "text-red-600" : 
                    "text-blue-600"}`}>
                    {student.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="p-4 text-center text-white">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
