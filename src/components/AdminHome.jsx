import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import "../style/adminhome.css";
import register from "../assets/img/registers.png";
import stddet from "../assets/img/stddetails.png";
import fees from "../assets/img/fees.png";
import complaint from "../assets/img/complaint1.png";
import room from "../assets/img/room.png";
import outpass from "../assets/img/outpass.png";
import { CustomBaseUrl } from './CustomBaseUrl.js';

gsap.registerPlugin(ScrollTrigger);

export const AdminHome = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [badge, setBadge] = useState({});
  const sectionsRef = useRef([]);

  useEffect(() => {
   
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get("/std/notification", {
          headers: { token: token },
        });
        setBadge(response.data.data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch notifications", { variant: "error" });
      }
    };
  
    fetchNotifications();
  
    
    sectionsRef.current.forEach((section, index) => {
      const img = section.querySelector("img");
      const text = section.querySelector("p");
    
      
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    
     
      if (img) {
        gsap.fromTo(
          img,
          { scale: 0.9, rotateY: 10, rotateX: 5 },
          {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
    
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.05,
            rotateY: 5,
            rotateX: -5,
            duration: 0.5,
            ease: "power2.out",
          });
        });
    
        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        });
      }
    
      
      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40, skewX: 2 },
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 1.5, 
            ease: "power1.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%", 
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
    
    
  
  }, []);
  
  

  return (
    <div className="admindash md:pt-24 w-full flex justify-center items-center flex-col">
      

      <div ref={(el) => (sectionsRef.current[0] = el)} className="section w-full md:w-[1000px] mt-2 mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>Add a new student with OTP verification <Link to="/stdreg" className=' '><span className='text-blue-200'>Register</span></Link></p>
          </div>
          <div className="md:w-[300px] w-[200px]  md:mr-3">
            <img src={register} alt="Student Register" className='sm:w-[100px] md:w-[250px]' />
          </div>
        </div>
      </div>

      
      <div ref={(el) => (sectionsRef.current[1] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[300px] w-[200px]  md:ml-7">
            <img src={fees} alt="Fees" className='sm:w-[100px] md:w-[250px]' />
          </div>
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>Manage student fee payments, track <span className='text-yellow-200'>Pending dues </span> {badge?.fesspending > 0 && <span className='font-semibold text-red-400'> {badge.fesspending} </span>}, update payment statuses seamlessly, and <Link to="/allfesspayments"><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
        </div>
      </div>

      
      <div ref={(el) => (sectionsRef.current[2] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>Access and manage complete student details, including personal information, room allocation, fee status, and academic records <Link to="/stddetails"><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
          <div className="md:w-[300px] w-[200px]  md:mr-3">
            <img src={stddet} alt="Student Details" className='sm:w-[100px] md:w-[250px]' />
          </div>
        </div>
      </div>

      
      <div ref={(el) => (sectionsRef.current[3] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[300px] w-[200px]  md:ml-7">
            <img src={room} alt="Room" className='sm:w-[100px] md:w-[250px]' />
          </div>
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>Assign and manage hostel rooms seamlessly, ensuring optimal allocation based on availability and student requirements. <br/>
            <span className='text-yellow-200'> Total Rooms</span> : <span className='text-gray-200'> 20</span> <br/>  
            <span className='text-red-500'> Occupied </span> : <span className='text-gray-200'>{badge?.roomActive || "No Occupied"} </span>  
            <br/>  
            <span className='text-green-500'> Available </span> : <span className='text-gray-200'> {badge?.roomAvailable || "No Available"} </span>
            <br/>  
            <Link to="/roomallocation"><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
        </div>
      </div>

      
      <div ref={(el) => (sectionsRef.current[4] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>Manage student outpass requests efficiently. Approve or reject applications and track pending requests in real-time. <span className='text-yellow-200'> Request Pending</span> : <span className='text-red-500'> {badge?.outPassNotify || "No Request"} </span> <br /><Link to="/stdoutpassview"><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
          <div className="md:w-[300px] w-[200px]  md:mr-3">
            <img src={outpass} alt="Outpass" className='sm:w-[100px] md:w-[250px]' />
          </div>
        </div>
      </div>

      
      <div ref={(el) => (sectionsRef.current[5] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[300px] w-[200px]  md:ml-7">
            <img src={complaint} alt="Complaints" className='sm:w-[100px] md:w-[250px]' />
          </div>
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>Manage student complaints efficiently.<span className='text-yellow-200'> Pending Complaints</span>: <span className='text-red-500'> {badge?.complaintNotify || "No Complaints"} </span> <br /><Link to="/allcomplaints"><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
        </div>
      </div>

    </div>
  );
};
