import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSnackbar } from "notistack";
import "../style/Outpass.css"
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const Complaintall = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/fetchallcomplaint", {
          headers: { token },
        });
        setStudents(response.data.data);
      } catch (err) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="outpass flex justify-center items-center w-full min-h-screen p-4">
      <div className="container bg-white bg-opacity-40 md:w-full p-4">
      <h1 className="text-center text-white text-2xl font-bold mb-6">COMPLAINTS</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-green-600 text-white text-lg">
                <th className="p-3 border">Index</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Sno</th>
                <th className="p-3 border">Room No</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Issues</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student._id} className="text-center even:bg-gray-100 hover:bg-gray-200">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{student.date}</td>
                    <td className="p-3 border">{student.sno}</td>
                    <td className="p-3 border">{student.roomno}</td>
                    <td className="p-3 border">{student.name}</td>
                    <td className="p-3 border">{student.subject}</td>
                    <td className="p-3 border">{student.issuse}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-lg text-gray-600">No Complaints Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};
