import React, { useEffect, useState } from 'react';
import "../style/StdRegiste.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { gsap } from "gsap";
import { CustomBaseUrl } from './CustomBaseUrl.js';
export const UpdateFess = () => {
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
  });

  const [balance, setBalance] = useState(null);
  const [paid, setPaid] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigator = useNavigate();

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true); 
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get(`/std/fetchoneFess/${id}`, {
          headers: {
            token: token,
          },
        });
        setStudent(response.data.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
        enqueueSnackbar("Student Fetch Data Failed...", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id, enqueueSnackbar]);
  useEffect(() => {
    gsap.fromTo(".reg-container", { opacity: 0 }, { opacity: 1, duration: 1 });
  
    gsap.fromTo(".fessupt", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" });
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
  }, [student.total, student.caution, student.mess, student.rent, student.others, enqueueSnackbar]);

  const handleFees = async (e) => {
    e.preventDefault();
    console.log("handleFees called");
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await CustomBaseUrl.put(`/std/updatefeespayment/${id}`, {
        student,
        balance: balance == null ? "0" : balance,
      }, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
  
      if (!response) {
        enqueueSnackbar("Fees Payment not saved", { variant: "error" });
        return;
      }
      enqueueSnackbar(response.data.message, { variant: "success" });
  
      setTimeout(() => {
        navigator("/allfesspayments");
      }, 3000);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred while updating fees.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="reg-container flex flex-col items-center justify-center min-h-screen  p-4 ">
      {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      
      <div className="w-full max-w-4xl bg-black bg-opacity-70 shadow-lg rounded-lg p-4 mt-12">
       
        <h2 className='fessupt text-2xl text-red-500 text-center uppercase'>Fess Update</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          
          <div>
            <h2 className="fessupt text-lg text-green-500 font-semibold">Student Details</h2>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Sno</label>
              <input type="text" name="sno" value={student.sno} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Room No</label>
              <input type="text" name="roomno" value={student.roomno} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Name</label>
              <input type="text" name="name" value={student.name} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Date</label>
              <input type="date" name="date" value={student.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Select Sem</label>
              <select name="sem" value={student.sem} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Odd Sem">Odd Sem</option>
                <option value="Even Sem">Even Sem</option>
              </select>
            </div>
          </div>

          
          <div>
            <h2 className="fessupt text-lg text-green-500 font-semibold">Fees Details</h2>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Total Amount</label>
              <input type="number" name="total" value={student.total} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Caution Deposit</label>
              <input type="number" name="caution" value={student.caution} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Mess Fee</label>
              <input type="number" name="mess" value={student.mess} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Rent Fee</label>
              <input type="number" name="rent" value={student.rent} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-3 form-groups">
              <label className="block font-medium text-white">Others</label>
              <input type="number" name="others" value={student.others} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          </div>
        </div>

        
        <div className="text-center mt-4">
          {balance !== undefined && <h2 className="fessupt text-red-400 text-xl font-bold">Balance: ₹ {balance}</h2>}
          {paid && <h2 className="text-green-600 font-bold">{paid}</h2>}
          <button
            className="uptbtn w-full bg-blue-500 text-white py-2 mt-3 rounded-lg hover:bg-blue-600 transition"
            onClick={handleFees}
            disabled={balance < 0}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );

  
}
