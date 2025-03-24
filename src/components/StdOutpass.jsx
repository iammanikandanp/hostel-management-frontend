import React, { useEffect, useState } from 'react'
import "../style/Outpass.css"

import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { gsap } from 'gsap'
import { CustomBaseUrl } from './CustomBaseUrl.js'

export const StdOutPass = () => {
    const [student,setStudent]=useState({
        sno: "",
        roomno: "",
        name: "",
        email:"",
        timeout: "",
        timein: "",
        intimeap: "",
        outtimeap: "",
        date: "",
        phno: "",
        parentphno: "",
        detail: "",
    })

  const { enqueueSnackbar } = useSnackbar()
    const [loading,setLoading]=useState(false)
    const navigator=useNavigate()

 const handleChange = (e)=>{
    setStudent({...student,
        [e.target.name]:e.target.value
    })
 }

 useEffect(()=>{
  gsap.fromTo("h2",{opacity:0,x:30},{opacity:1,x:0,duration:1, ease:"sine"})
  gsap.fromTo("input",{opacity:0,y:20},{opacity:1,y:0,duration:1,stagger:0.5})
  gsap.fromTo("date",{opacity:0,y:20},{opacity:1,y:0,duration:1,stagger:0.5})
  gsap.fromTo("select",{opacity:0,y:20},{opacity:1,y:0,duration:1,stagger:0.5})
  gsap.fromTo(".detail",{opacity:0,y:20},{opacity:1,y:0,duration:1,stagger:0.5})
  gsap.fromTo(
        "button",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "bounce.out" },
        "-=0.5" 
      );
  
    const fectchingstddel= async()=>{
     try {
         const token = localStorage.getItem("token")
         const response= await CustomBaseUrl.get("/std/fetchingstudent",{
             headers:{
                 token:token,
             }
         })
         
         if(!response){
             return enqueueSnackbar("Token not Access",{variant:"error"})
         }
         enqueueSnackbar(response.data.message,{variant:"success"})
         setStudent(response.data.data)
         
     } catch (error) {
         enqueueSnackbar("Unauthorized Access.",{variant:"error"})
         console.log("fetchOutPassAll",error)
     }
    }
    fectchingstddel()
 },[])

const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const response = await CustomBaseUrl.post(
            "/std/stdreqoutpass",
            student,
            {
              headers: {
                "Content-Type": "application/json",
                token: token,
              },
            }
          );
        if (response) {
            enqueueSnackbar(response.data.message,{variant:"success"});
                navigator("/stdhome");
        } else {
            enqueueSnackbar("Failed to send the outpass request. Please try again. ");
        }
       
    } catch (error) {
        console.log("Outpass Request :", error)
        enqueueSnackbar("Failed to send the outpass request. Please try again. ");
     
    } finally {
        setLoading(false)
    }
}

  return (
    <>
    
   
    <div className="outpass">
          <div className=" max-w-4xl mx-auto  md:my-20 p-6 bg-black bg-opacity-40 shadow-lg rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="  "
          >
            
            {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          </div>
        )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-green-500">Student Details</h2>
                
                <div className="grid md:grid-cols-1 grid-cols-2  gap-4">
                  <input
                    type="text"
                    name="sno"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter sno"
                    value={student.sno}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="roomno"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Room No"
                    value={student.roomno}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    value={student.name}
                    required
                  />
               
                  <input
                    type="number"
                    name="phno"
                    className="w-full p-2 border rounded-md mb-0"
                    placeholder="Enter Phone Number"
                    value={student.phno}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="parentphno"
                    className="w-full p-2 border rounded-md mb-0"
                    placeholder="Enter Parent Phone Number"
                    value={student.parentphno}
                    onChange={handleChange}
                    required
                  />
                   <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md outline-green-600"
                  placeholder="Enter Email"
                  value={student.email}
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
      
              
              <div className="space-y-6">
                <h2 className="text-xl font-bold  text-green-500">OutPass Details</h2>
               
                <div className="">
                  <label htmlFor="outtime" className='block  text-green-500'>OutTime</label>
                <div className='flex'>
                  <input
                    type="time"
                    name="timeout"
                    className="w-[200px] h-12 p-2 border rounded-md mr-3 mb-2 outline-green-600"
                    id='outtime'
                    value={student.timeout}
                    onChange={handleChange}
                    required
                  />
                   <select name="outtimeap" id="am" className='w-[200px] p-2 h-12 border rounded-md outline-green-600' onChange={handleChange}
                            value={student.outtimeap} >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                 </select>
                 </div>
                 
                 <label htmlFor="intime" className='block  text-green-500'>InTime</label>
                 <div className='flex'>
                  <input
                    type="time"
                    name="timein"
                    className="w-[200px] h-12 p-2 border rounded-md mr-3 outline-green-600"
                    id='intime'
                    value={student.timein}
                    onChange={handleChange}
                    required
                  />
                    <select name="intimeap" id="pm" className='w-[200px] h-12 p-2 border rounded-md outline-green-600' onChange={handleChange}
                            value={student.intimeap} >
                    <option value="">AM/PM</option>

                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                </div>
                </div>
                <input
                  type="date"
                  name="date"
                  className="w-full p-2 border rounded-md outline-green-600"
                  value={student.date}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="detail"
                  className="detail w-full p-2 border rounded-md outline-green-600"
                  placeholder="Enter your Reason..."
                  rows="3"
                  value={student.detail}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
      
            
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Out Pass
              </button>
            </div>
          </form>
          </div>
          </div>
    </>
  )
}
