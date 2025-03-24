import React, { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { Link, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { CustomBaseUrl } from './CustomBaseUrl.js';

const StdRegister = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formdata, setFormData] = useState({
    sno: "",
    roomno: "",
    rollno: "",
    name: "",
    Class: "",
    department: "",
    email: "",
    password: "",
    address: "",
    city: "",
    phone: "",
    parentphno: "",
    dob: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await CustomBaseUrl.post("/std/stdregister", formdata);

      if (response.data.activationToken) {
        localStorage.setItem("activationToken", response.data.activationToken);
      }

      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate("/stdotp");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong! Please try again.";
      enqueueSnackbar(errorMsg, { variant: 'error' });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      ".form-title",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    tl.fromTo(
      ".form-containers",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        ".form-group",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
        "-=0.5")
      .fromTo(
        ".register-btn",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "bounce.out" },
        "-=0.5"
      );

  }, []);


  const handleCheckRoom = async () => {



    const roomNo = formdata.roomno; 
    if (!roomNo || roomNo < 4 || roomNo > 20) {
      enqueueSnackbar("Room number must be between 4 and 20 characters.", { variant: "error" });
      return;
    }


    try {
      const response = await CustomBaseUrl.get(`/std/check-room/${roomNo}`);
      const { available, message } = response.data;

      if (available) {
        enqueueSnackbar(message, { variant: "success" });
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error checking room availability.", { variant: "error" });
    }
  };


  return (
    <>

      {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className="reg-container  w-full md:h-screen flex flex-col justify-center items-center   ">
        <form
          onSubmit={handleSubmit}
          className="form-containers bg-opacity-40 w-full w-7xl text-lg p-6   bg-black  rounded-lg shadow-md">


          <h2 className="form-title text-3xl  text-center text-green-500 mb-4">Student Registration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <div className="form-group ">
                <label htmlFor="sno" className="block " style={{ color: "white" }}>Sno</label>
                <input type="number" id="sno" name="sno" value={formdata.sno} onChange={handleChange} required className="input-field w-full text-lg p-2 border rounded-md" />
              </div>
              <div className="form-group flex flex-col gap-2">
                <label htmlFor="roomno" className="text-white" style={{ color: "white" }}>Room No</label>
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    id="roomno"
                    name="roomno"
                    placeholder='Enter Room No 4-20'
                    value={formdata.roomno}
                    onChange={handleChange}
                    required
                    className="w-4/5 p-2 border border-gray-300 rounded"
                  />
                  <button className="w-1/5 bg-blue-500 text-white p-2 rounded" onClick={handleCheckRoom}>Check</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="block " style={{ color: "white" }}>Name</label>
                <input type="text" id="name" name="name" value={formdata.name} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="rollno" className="block " style={{ color: "white" }}>Roll No</label>
                <input type="text" id="rollno" name="rollno" value={formdata.rollno} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="Class" className="block " style={{ color: "white" }}>Class</label>
                <input type="text" id="Class" name="Class" value={formdata.Class} onChange={handleChange} required className="input-field" />
              </div>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="department" className="block " style={{ color: "white" }}>Department</label>
                <select
                  id="department"
                  name="department"
                  value={formdata.department}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                >
                  <option value="">--Select Department--</option>
                  <option value="Department of Defence and Strategic Studies (SF)">Department of Defence and Strategic Studies (SF)</option>
                  <option value="Department of Tamil">Department of Tamil</option>
                  <option value="Department of Tamil (SF)">Department of Tamil (SF)</option>
                  <option value="Department of English">Department of English</option>
                  <option value="Department of English (SF)">Department of English (SF)</option>
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Mathematics (SF)">Department of Mathematics (SF)</option>
                  <option value="Department of Computer Science">Department of Computer Science</option>
                  <option value="Department of Computer Science (SF)">Department of Computer Science (SF)</option>
                  <option value="Department of Physics">Department of Physics</option>
                  <option value="Department of Physics (SF)">Department of Physics (SF)</option>
                  <option value="Department of Zoology">Department of Zoology</option>
                  <option value="Department of Chemistry">Department of Chemistry</option>
                  <option value="Department of Chemistry (SF)">Department of Chemistry (SF)</option>
                  <option value="Department of Botany">Department of Botany</option>
                  <option value="Department of Economics">Department of Economics</option>
                  <option value="Department of History">Department of History</option>
                  <option value="Department of History (SF)">Department of History (SF)</option>
                  <option value="Department of Commerce">Department of Commerce</option>
                  <option value="Department of Commerce (SF)">Department of Commerce (SF)</option>
                  <option value="Department of Commerce (CA) (SF)">Department of Commerce (CA) (SF)</option>
                  <option value="Department of Commerce (PA) (SF)">Department of Commerce (PA) (SF)</option>
                  <option value="Department of Commerce (BF) (SF)">Department of Commerce (BF) (SF)</option>
                  <option value="Department of Commerce (BI) (SF)">Department of Commerce (BI) (SF)</option>
                  <option value="Department of Corporate Secretaryship">Department of Corporate Secretaryship</option>
                  <option value="Department of Corporate Secretaryship (SF)">Department of Corporate Secretaryship (SF)</option>
                  <option value="Department of Business Management">Department of Business Management</option>
                  <option value="Department of Physical Education">Department of Physical Education</option>
                  <option value="Department of  Library and Information Science">Department of Library and Information Science</option>
                  <option value="Department of Political Science (SF)">Department of Political Science (SF)</option>
                  <option value="Department of Food Science and Nutrition (SF)">Department of Food Science and Nutrition (SF)</option>
                  <option value="Department of Biochemistry (SF)">Department of Biochemistry (SF)</option>
                  <option value="Department of Microbiology (SF)">Department of Microbiology (SF)</option>
                  <option value="Department of Costume Design and Fashion (SF)">Department of Costume Design and Fashion (SF)</option>
                  <option value="Department of Business Administration (SF)">Department of Business Administration (SF)</option>
                  <option value="Department of Computer Science with Cyber Security (SF)">Department of Computer Science with Cyber Security (SF)</option>
                  <option value="Department of Computer Technology (SF)">Department of Computer Technology (SF)</option>
                  <option value="Department of Information Technology (SF)">Department of Information Technology (SF)</option>
                  <option value="Department of Computer Applications (SF)">Department of Computer Applications (SF)</option>
                  <option value="Department of Microbiology (SF)">Department of Microbiology (SF)</option>
                  <option value="Department of Master of Social Work (SF)">Department of Master of Social Work (SF)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block " style={{ color: "white" }}>Email</label>
                <input type="email" id="email" name="email" value={formdata.email} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="block " style={{ color: "white" }}>password</label>
                <input type="password" id="password" name="password" value={formdata.password} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="block " style={{ color: "white" }}>Address</label>
                <input type="text" id="address" name="address" value={formdata.address} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="block " style={{ color: "white" }}>City</label>
                <input type="text" id="city" name="city" value={formdata.city} onChange={handleChange} required className="input-field" />
              </div>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="dob" className="block " style={{ color: "white" }}>DOB</label>
                <input type="date" id="dob" name="dob" value={formdata.dob} onChange={handleChange} required className="input-field" />
              </div>


              <div className="form-group">
                <label htmlFor="phone" className="block " style={{ color: "white" }}>Phone No</label>
                <input type="text" id="phone" name="phone" value={formdata.phone} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="parentphno" className="block " style={{ color: "white" }}>Parent Phone No</label>
                <input type="text" id="parentphno" name="parentphno" value={formdata.parentphno} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label htmlFor="year" className="block " style={{ color: "white" }}>year</label>
                <input type="text" id="year" name="year" value={formdata.year} onChange={handleChange} required className="input-field" />
              </div>


            </div>

          </div>
          <div className="flex justify-center mt-4 ">
            <button type="submit" className="register-btn text-xl font-semibold bg-green-500 text-white py-2 px-6 rounded-lg">Register</button>
          </div>
          <p className="text-center text-white">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
        </form>
      </div>


    </>
  );
};

export default StdRegister;

