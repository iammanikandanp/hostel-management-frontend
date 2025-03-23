import React, { useEffect, useState } from 'react'
import "../style/StdRegiste.css"
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { CustomBaseUrl } from './CustomBaseUrl.js';

export const StdUpdates = () => {

  const [student, setStudent] = useState({
    sno: "",
    roomno: "",
    rollno: "",
    name: "",
    class: "",
    dept: "",
    email: "",
    address: "",
    city: "",
    phno: "",
    parentphno: "",
    dob: "",
    year: "",
  })
  const { id } = useParams();

  const [loading, setLoading] = useState(false)
 const { enqueueSnackbar } = useSnackbar();  
  const navigator=useNavigate()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const response = await CustomBaseUrl.get(`/std/update/${id}`, {
          headers: {
            token: token,
          },
        })
       enqueueSnackbar(response.data.message,{variant:"success"})
        setStudent(response.data.data)

      } catch (error) {
        console.error("Error fetching student details:", error);
        enqueueSnackbar("Student FetchData Failed...",{variant:"error"})
      } finally {
        setLoading(false)
      }

    }
    fetchdata()
  }, [id])




  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await CustomBaseUrl.put(`/std/update/${id}`,student,{
        headers:{token}
      })
       enqueueSnackbar(response.data.message,{variant:"success"})
       setTimeout(()=> navigator("/stddetails"),5000)
    } catch (error) {
        console.error("Error fetching student details:", error);
        enqueueSnackbar("Student Update Failed...",{variant:"error"})
    }finally{
      setLoading(false)

    }
  }


return (
  <>
  <div className="reg-container  w-full md:h-fit flex flex-col justify-center items-center   ">
    <form
      onSubmit={handleSubmit}
       className="form-containers md:bg-opacity-40  w-full md:w-5xl  text-lg p-6 pt-[60px] md:bg-black  sm:bg-white rounded-lg shadow-md">

    
    <h2 className="form-title text-3xl  text-center text-green-500 mb-4">Update Student Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <div>
          <div className="form-group ">
            <label htmlFor="sno" className="block " style={{color:"white"}}>Sno</label>
            <input type="number" id="sno" name="sno" value={student.sno} onChange={handleChange} required className="input-field w-full text-lg p-2 border rounded-md" />
          </div>
          <div className="form-group">
            <label htmlFor="roomno" className="block " style={{color:"white"}}>Room No</label>
            <input type="number" id="roomno" name="roomno" value={student.roomno} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="block " style={{color:"white"}}>Name</label>
            <input type="text" id="name" name="name" value={student.name} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="rollno" className="block " style={{color:"white"}}>Roll No</label>
            <input type="text" id="rollno" name="rollno" value={student.rollno} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="class" className="block " style={{color:"white"}}>Class</label>
            <input type="text" id="class" name="class" value={student.class} onChange={handleChange} required className="input-field" />
          </div>
        </div>

        <div>
        <div className="form-group">
          <label htmlFor="dept" className="block " style={{color:"white"}}>Department</label>
  <select 
    id="dept" 
    name="dept" 
    value={student.dept} 
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
            <label htmlFor="email" className="block " style={{color:"white"}}>Email</label>
            <input type="email" id="email" name="email" value={student.email} onChange={handleChange} required className="input-field" />
          </div>
         
          <div className="form-group">
            <label htmlFor="address" className="block " style={{color:"white"}}>Address</label>
            <input type="text" id="address" name="address" value={student.address} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="city" className="block " style={{color:"white"}}>City</label>
            <input type="text" id="city" name="city" value={student.city} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="block " style={{color:"white"}}>DOB</label>
            <input type="date" id="dob" name="dob" value={student.dob} onChange={handleChange} required className="input-field" />
          </div>
        </div>

        <div>
         


          <div className="form-group">
            <label htmlFor="phno" className="block " style={{color:"white"}}>Phone No</label>
            <input type="text" id="phno" name="phno" value={student.phno} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="parentphno" className="block " style={{color:"white"}}>Parent Phone No</label>
            <input type="text" id="parentphno" name="parentphno" value={student.parentphno} onChange={handleChange} required className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="year" className="block " style={{color:"white"}}>year</label>
            <input type="text" id="year" name="year" value={student.year} onChange={handleChange} required className="input-field" />
          </div>
          
          
        </div>
       
      </div>
      <div className="flex justify-center  ">
        <button type="submit" className="register-btn text-xl font-semibold bg-green-500 text-white py-2  px-6 rounded-lg">Update</button>
      </div>
    </form>
  </div>
  

  </>
);
}
