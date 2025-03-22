import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "../style/Outpass.css"
import { CustomBaseUrl } from "./CustomBaseUrl.js";
export const Approval = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get(
          "/std/requestoutpass",
          {
            headers: {
              token: token,
            },
          }
        );
        setStudents(response.data.data);
      } catch (err) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await CustomBaseUrl.put(
        `/std/demoapproval/${id}`,
        { status },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      enqueueSnackbar(response.data.message, {
        variant: status === "Approved" ? "success" : "error",
      });

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
    } catch (err) {
      console.error("Error updating status:", err.response || err.message);
      enqueueSnackbar("Failed to update status", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outpass">
    <div className="md:pt-24 min-h-screen  mx-auto p-4">
      <h1 className="text-center text-white text-2xl font-bold mb-6">
        OutPass Approval
      </h1>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border bg-white  border-gray-300">
          <thead>
            <tr className="bg-green-500 text-gray-800">
              <th className="p-2 border">Index</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Sno</th>
              <th className="p-2 border">Room No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Out Time</th>
              <th className="p-2 border">In Time</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Parent Phone</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Approve</th>
              <th className="p-2 border">Decline</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student._id} className="text-center border">

                  <td className="p-2 border">{student.index+1}</td>
                  <td className="p-2 border">{student.date}</td>
                  <td className="p-2 border">{student.sno}</td>
                  <td className="p-2 border">{student.roomno}</td>
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.outtime} <span>{student.outtimeap}</span></td>
                  <td className="p-2 border">{student.intime} <span>{student.intimeap}</span></td>
                  <td className="p-2 border">{student.phno}</td>
                  <td className="p-2 border">{student.parentphno}</td>
                  <td className="p-2 border">{student.reason}</td>
                  <td className="p-2 border">
                    <button
                      className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-700"
                      onClick={() => handleStatusChange(student._id, "Approved")}
                    >
                      Approve
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleStatusChange(student._id, "Decline")}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4 text-black">
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
