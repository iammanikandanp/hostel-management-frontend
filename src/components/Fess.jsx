import React, { useEffect, useState } from 'react'
import "../style/StdRegiste.css"
import { gsap } from "gsap"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CustomBaseUrl } from './CustomBaseUrl.js';

export const Fess = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [student, setStudent] = useState({
    sno: "",
    roomno: "",
    name: "",
    sem: "",
    date: "",
    total: "",
    caution: "",
    mess: "",
    rent: "",
    others: "",
    email: "",
  });

  const [balance, setBalance] = useState(null);
  const [paid, setPaid] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

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
        headers: {
          token: token
        }
      });

      console.log(response);
      if (!response.data || !response.data.data) {
        enqueueSnackbar("Student Data is Unavailable", { variant: "error" });
        return;
      }

      enqueueSnackbar("Student data fetched successfully!", { variant: "success" });
      setStudent(response.data.data);
      
    } catch (error) {
      console.log("Data Fetching Error:", error);
      enqueueSnackbar("The student is unavailable for this serial number. Please provide a valid serial number.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    gsap.fromTo(".reg-container", { opacity: 0 }, { opacity: 1, duration: 1 });
  
    gsap.fromTo(".feesupt", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" });
    gsap.fromTo(
      
        ".form-groups",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
        "-=0.5")
    gsap.fromTo(
      ".uptbtn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "bounce.out" },
      "-=0.5" 
    );    
  }, []);
  useEffect(() => {
    const { total, caution, mess, rent, others } = student;

    if (total) {
      const balance = Number(total) - (Number(caution) + Number(mess) + Number(rent) + Number(others));

      if (balance > 0) {
        setPaid(null);
        setBalance(balance.toFixed(2));
      } else if (balance === 0) {
        setBalance(null);
        setPaid("No Pending");
      } else if (balance < 0) {
        setPaid(null);
        setBalance(balance.toFixed(2));
        enqueueSnackbar("Entered fees exceed the total amount. Please check and correct.", { variant: "warning" });
      }
    } else {
      setBalance(null);
      setPaid(null);
    }
  }, [student.total, student.caution, student.mess, student.rent, student.others]);

  const handleFees = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await CustomBaseUrl.post("/std/feespayment", {
        student: { ...student },
        balance: balance == null ? "0" : balance
      }, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        }
      });

      console.log(response.data);
      if (!response) {
        enqueueSnackbar("Fees Payment not Saved", { variant: "error" });
        return;
      }

      enqueueSnackbar(response.data.message, { variant: "success" });

      setTimeout(() => {
        navigator("/allfesspayments");
      }, 3000);

    } catch (error) {
      console.log(error);
      enqueueSnackbar("An error occurred while processing fees payment.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };



  
  return (
    <div className="reg-container flex justify-center items-center min-h-screen">
      <div className="bg-black bg-opacity-45 shadow-lg rounded-lg p-6 w-full max-w-6xl flex flex-col md:flex-row gap-6 overflow-auto">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          </div>
        )}
  
        <form onSubmit={handleFees} className="w-full flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3  p-4 rounded-lg shadow-md">
            <h3 className="feesupt text-lg font-semibold text-green-500 mb-2">Search Student</h3>
            <div className="flex form-groups">
              <input
                type="text"
                name="sno"
                placeholder="Enter Sno"
                value={student.sno}
                onChange={handleChange}
                className="w-3/4 p-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={checkout}
                className="w-1/4 ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Search
              </button>
            </div>
            <h3 className="feesupt text-lg font-semibold text-green-500 mb-2 pt-3">Student Details</h3>
            <div className="grid grid-cols gap-4 form-groups">
              {["roomno", "name", "email"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={student[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              ))}
            </div>
          </div>
  
          <div className="md:w-2/3 flex flex-col">
            <div className="bg-gray-50 bg-opacity-55 p-4 rounded-lg shadow-md flex-grow">
              <h3 className="feesupt text-lg font-semibold text-black mt-4 mb-2">Fees Details</h3>
              <div className="grid grid-cols-2 gap-4 form-groups">
                {["total", "caution", "mess", "rent"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    value={student[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 form-groups">
                {["others", "date"].map((field) => (
                  <input
                    key={field}
                    type={field === "date" ? "date" : "text"}
                    name={field}
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    value={student[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                ))}
              </div>
  
              <select
                name="sem"
                value={student.sem}
                onChange={handleChange}
                className="form-groups w-full p-2 border rounded-md mt-4"
              >
                <option value="odd sem">--Select Semester--</option>
                <option value="Odd Sem">Odd Sem</option>
                <option value="Even Sem">Even Sem</option>
              </select>
  
              {balance && <h2 className="text-red-600 font-bold text-lg text-center mt-2">Balance: ₹ {balance}</h2>}
              {paid && <h2 className="text-green-500 font-semibold text-center mt-2">{paid}</h2>}
            </div>
  
            <div className="mt-4">
              <button
                type="submit"
                className={`uptbtn w-full p-3 text-white rounded-md ${balance < 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                disabled={balance < 0}
              >
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
}