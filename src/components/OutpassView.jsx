import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { gsap } from "gsap"
import "../style/Outpass.css"
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const OutpassView = () => {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [badge, setBadge] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/findalloutpass", {
          headers: { token },
          params: { status, search },
        });

        setStudents(response.data.data.findAllOutPass);
        setBadge(response.data.data);

        
      } catch (err) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      }
    };
    fetchData();
  }, [status, search]);

  useEffect(()=>{
 gsap.fromTo(".tables-btn",{opacity:0, x:-20},{opacity:1,x:0,ease:"sine",duration:1})
 
  gsap.fromTo(
       "tbody tr", 
       { opacity: 0, y: 20 , delay:0.5 }, 
       { opacity: 1, y: 0, duration: 0.5, ease: "power2", stagger: 0.1 }
     );
   
  },[])


  return (
<div className=" mx-auto tables-btn md:w-full  lg:px-0 ">

      <div className="outpass shadow-md  p-4">
   
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:pt-20 mb-4">

  <div className="flex-shrink-0 ">
    <input
      type="text"
      placeholder="Search by name or room number"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 rounded-md sm:w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
    />
  </div>

 
  <div className="flex items-center justify-end gap-3 w-full md:w-auto">
    <select
      id="statusFilter"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="all">All</option>
      <option value="Request">Request</option>
      <option value="Approved">Approved</option>
      <option value="Decline">Decline</option>
    </select>

    <Link to="/adminoutpass">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        OutPass
      </button>
    </Link>

    <div className="relative">
      {badge?.outPassNotify > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge.outPassNotify}
        </span>
      )}
      <Link to="/approvaloutpass">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Approval Request
        </button>
      </Link>
    </div>
  </div>
</div>



     
        <h1 className="text-center text-white text-2xl font-bold ">
          OutPass Details
        </h1>

       
        <div className=" overflow-x-auto mt-6">
  <table className="w-full border-collapse border border-gray-400 shadow-lg">
    <thead>
      <tr className="bg-green-500 text-gray-800 text-base">
        <th className="border border-gray-600 px-4 py-3">Index</th>
        <th className="border border-gray-600 px-4 py-3">Date</th>
        <th className="border border-gray-600 px-4 py-3">Sno</th>
        <th className="border border-gray-600 px-4 py-3">Room No</th>
        <th className="border border-gray-600 px-4 py-3">Name</th>
        <th className="border border-gray-600 px-4 py-3">Out Time</th>
        <th className="border border-gray-600 px-4 py-3">In Time</th>
        <th className="border border-gray-600 px-4 py-3">Phone</th>
        <th className="border border-gray-600 px-4 py-3">Parent Phone</th>
        <th className="border border-gray-600 px-4 py-3">Reason</th>
        <th className="border border-gray-600 px-4 py-3">Status</th>
      </tr>
    </thead>
    <tbody>
  {students.length > 0 ? (
    students.map((student, index) => (
      <tr
        key={student._id}
        className="text-center text-gray-800 text-base bg-white even:bg-gray-100 hover:bg-gray-100 transition"
      >
        <td className="border border-gray-400 px-4 py-3">{index + 1}</td>
        <td className="border border-gray-400 px-4 py-3">{student.date}</td>
        <td className="border border-gray-400 px-4 py-3">{student.sno}</td>
        <td className="border border-gray-400 px-4 py-3">{student.roomno}</td>
        <td className="border border-gray-400 px-4 py-3">{student.name}</td>
        <td className="border border-gray-400 px-4 py-3">
          {student.outtime} <span>{student.outtimeap}</span>
        </td>
        <td className="border border-gray-400 px-4 py-3">
          {student.intime} <span>{student.intimeap}</span>
        </td>
        <td className="border border-gray-400 px-4 py-3">{student.phno}</td>
        <td className="border border-gray-400 px-4 py-3">{student.parentphno}</td>
        <td className="border border-gray-400 px-4 py-3">{student.reason}</td>
       <td
  className={`border border-gray-400 px-4 py-3 font-bold ${
    student.status.toLowerCase() === "approved"
      ? "text-green-600"
      : student.status.toLowerCase() === "decline"
      ? "text-red-700"
      : "text-blue-700"
  }`}
>
  {student.status}
</td>

      </tr>
    ))
  ) : (
    <tr >
      <td colSpan="11" className="text-center py-5  text-lg" style={{color:"white"}}>
        No students found
      </td>
      

    </tr>
    
  )}
</tbody>



  </table>
</div>

      </div>
    </div>
  );
};
