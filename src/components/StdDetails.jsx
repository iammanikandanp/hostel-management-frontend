import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import "../style/Outpass.css";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const StdDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/fetch", {
          headers: { token: token },
          params: { status, search },
        });
        setStudents(response.data.data);
      } catch (err) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      }
    };
    fetchData();
  }, [status, search]);

  return (
    <div className="outpass min-h-screen sm:h-auto p-4 md:pt-16">
  <div className="mx-auto p-4 rounded-lg shadow-md">
    <div className="flex flex-col sm:flex-row  items-center justify-between mb-4 gap-2">
      <input
        type="text"
        placeholder="Search by name or room number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded-md shadow-sm w-full sm:w-64"
      />
      <select
        id="statusFilter"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2 border rounded-md shadow-sm w-full sm:w-auto"
      >
        <option value="all">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <h1 className="text-center text-white text-2xl font-bold mb-4">
      Student Details
    </h1>

    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse border  border-gray-300 text-sm min-w-[800px]">
        <thead>
          <tr className="bg-green-500 text-gray-800 md:text-lg sm:text-sm">
            <th className="border p-2">Sno</th>
            <th className="border p-2">Room No</th>
            <th className="border p-2">Roll No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2 hidden md:table-cell">Department</th>
            <th className="border p-2 hidden lg:table-cell">DOB</th>
            <th className="border p-2 hidden lg:table-cell">Address</th>
            <th className="border p-2 hidden xl:table-cell">City</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2 hidden lg:table-cell">Parent Phone</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id} className="odd:bg-white even:bg-gray-50 text-xs md:text-base text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{student.roomno}</td>
                <td className="border p-2">{student.rollno}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.class}</td>
                <td className="border p-2 hidden md:table-cell">{student.dept}</td>
                <td className="border p-2 hidden lg:table-cell">{student.dob}</td>
                <td className="border p-2 hidden lg:table-cell">{student.address}</td>
                <td className="border p-2 hidden xl:table-cell">{student.city}</td>
                <td className="border p-2">{student.phno}</td>
                <td className="border p-2 hidden lg:table-cell">{student.parentphno}</td>
                <td className="border p-2">{student.year}</td>
                <td className="border p-2 text-center">
                  <Link to={`/update/${student._id}`} className="text-blue-500">
                    <i className="fas fa-edit"></i>
                  </Link>
                </td>
                <td className="border p-2 text-center">
                  <Link
                    to={`/inactive/${student._id}`}
                    className={`px-3 py-1 rounded-md font-semibold md:text-lg sm:text-base ${
                      student.status === "Active" ? "text-green-500" : "text-red-500"
                    } hover:opacity-80`}
                  >
                    {student.status}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="border p-2 text-center text-white">
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
