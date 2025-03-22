import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { CustomBaseUrl } from './CustomBaseUrl.js';
export const StdFessview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchingfees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/stdfeesfetching", {
          headers: { token: token },
        });

        if (!response) {
          enqueueSnackbar("Student fees data not fetching. Please try again!", { variant: "error" });
          return;
        }

        setStudents(response.data.data);
        enqueueSnackbar(response.data.message, { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchingfees();
  }, []);

  return (
    <div className="outpass md:pt-24 mx-auto min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr className='p-2'>
                <th colSpan={5}></th>
                <th colSpan={7} className='bg-blue-300'>Fees</th>
                <th colSpan={2}></th>
              </tr>
              <tr>
                <th className="px-4 py-2">Index</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Sno</th>
                <th className="px-4 py-2">Room No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Sem</th>
                <th className="px-4 py-2">Caution</th>
                <th className="px-4 py-2">Mess</th>
                <th className="px-4 py-2">Rent</th>
                <th className="px-4 py-2">Others</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student._id} className="border-b text-center odd:bg-gray-100 even:bg-gray-200">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{student.date}</td>
                    <td className="px-4 py-2">{student.sno}</td>
                    <td className="px-4 py-2">{student.roomno}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.sem}</td>
                    <td className="px-4 py-2">{student.caution}</td>
                    <td className="px-4 py-2">{student.mess}</td>
                    <td className="px-4 py-2">{student.rent}</td>
                    <td className="px-4 py-2">{student.others}</td>
                    <td className="px-4 py-2">{student.total}</td>
                    <td className="px-4 py-2">{student.balance}</td>
                    <td
                      className="px-4 py-2 font-bold capitalize"
                      style={{ color: student.status === "paid" ? "green" : "red" }}
                    >
                      {student.status}
                    </td>
                    <td>
                      <Link to={`/downloadstdfess/${student._id}`} >
                    <i className="fa-solid fa-download cursor-pointer"></i>
                    </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center py-4">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
