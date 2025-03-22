import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { gsap } from "gsap";
import "../style/Outpass.css"
import { CustomBaseUrl } from "./CustomBaseUrl.js";


export const FeesViews = () => {
  const [students, setStudents] = useState([]);

  const [status,setStatus]=useState("all")
  const [search,setSearch]=useState("")

  const [loading,setLoading]=useState(false)
  
   const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {

      try {
        
        const token = localStorage.getItem("token")
        const response = await CustomBaseUrl.get("/std/fetchFess", 
          {
            headers: {
              token: token,
              
            },
            params:{status,search},
          }
        );
        setStudents(response.data.data);

      } catch (err) {
        enqueueSnackbar("Unauthorized Access",{variant:"error"});
      }
    };
    fetchData();
  }, [status,search]);

  const handleSendMail = async (e) => {
    e.preventDefault(); 
  
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      const response = await CustomBaseUrl.get("/std/pendingsendmail", {
        headers: {
          token: token,
        },
      });
  
      if (response.status === 200) { 
        enqueueSnackbar(response.data.message,{variant:"success"});
      } else {
        enqueueSnackbar("Email not sent!",{variant:"error"});
      }
  
    } catch (error) {
      console.log("Error sending email:", error);
      enqueueSnackbar("Failed to send the pending email. Please try again.",{variant:"error"});
      
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    gsap.fromTo(
      ".thead", 
      { opacity: 0, y: "-10" }, 
      { opacity: 1, duration: 1, y: "0", ease: "power4" }
    );
  
    gsap.fromTo(
      ".tables tbody tr", 
      { opacity: 0, y: 20, }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power2", stagger: 0.1 }
    );
  
  }, [students]); 
  



return (
  <div className=" mx-auto p-4 outpass md:pt-20 min-h-screen">
    {loading && (
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 border-4 border-dashed border-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

    <div className=" flex flex-wrap items-center justify-end gap-4 mb-4 py-2 px-2">
      <input
        type="text"
        placeholder="Search by name or room number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 text-sm w-full sm:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        id="statusFilter"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2  w-28 text-sm font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <Link to="/fees">
        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Fees</button>
      </Link>
      <button onClick={handleSendMail} className="px-4 py-2 bg-green-600 text-white font-semibold w-28 rounded-md hover:bg-green-700 transition">
        Send Mail
      </button>
    </div>

    <h1 className="text-center text-white text-xl font-bold mb-4">Payment Details</h1>

    <div className="overflow-x-auto">
      <table className="tables w-full border-collapse border border-gray-300 md:text-base  text-sm text-center">
      <thead className=" bg-green-500 text-gray-800 text-lg border border-gray-200">
  <tr className="p-3 border border-gray-200">
    <th colSpan={5} className="p-3 border border-gray-200"></th>
    <th colSpan={7} className="p-3 border border-gray-200" >Fees</th>
    <th colSpan={2} className="p-3 border border-gray-200"></th>
  </tr>
  <tr className="text-gray-800 text-lg border border-gray-200">
    <th className="p-2 border border-gray-200">Index</th>
    <th className="p-2 border border-gray-200">Date</th>
    <th className="p-2 border border-gray-200">Sno</th>
    <th className="p-2 border border-gray-200">Room No</th>
    <th className="p-2 border border-gray-200">Name</th>
    <th className="p-2 border border-gray-200">Sem</th>
    <th className="p-2 border border-gray-200">Caution</th>
    <th className="p-2 border border-gray-200">Mess</th>
    <th className="p-2 border border-gray-200">Rent</th>
    <th className="p-2 border border-gray-200">Others</th>
    <th className="p-2 border border-gray-200">Total</th>
    <th className="p-2 border border-gray-200">Balance</th>
    <th className="p-2 border border-gray-200">Status</th>
    <th className="p-2 border border-gray-200"></th>
  </tr>
</thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id} className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{student.date}</td>
                <td className="p-2 border">{student.sno}</td>
                <td className="p-2 border">{student.roomno}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.sem}</td>
                <td className="p-2 border">{student.caution}</td>
                <td className="p-2 border">{student.mess}</td>
                <td className="p-2 border">{student.rent}</td>
                <td className="p-2 border">{student.others}</td>
                <td className="p-2 border">{student.total}</td>
                <td className="p-2 border">{student.balance}</td>
                <td className="p-2 border font-bold capitalize" style={{ color: student.status === "paid" ? "green" : "red" }}>
                  {student.status === "pending" ? (
                    <Link to={`/updatefess/${student._id}`} className="text-red-500 ">Pending</Link>
                  ) : (
                    student.status
                  )}
                </td>
                <td className="p-2 border">
                      <Link to={`/downloadadminfess/${student._id}`} >
                    <i className="fa-solid fa-download cursor-pointer"></i>
                    </Link>
                    </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="text-center p-4 text-white">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};
