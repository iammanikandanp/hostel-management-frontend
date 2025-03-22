import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import "../style/adminhome.css";
import register from "../assets/img/profile.jpg";
import fees from "../assets/img/fees.png";
import complaint from "../assets/img/complaint1.png";
import outpass from "../assets/img/outpass.png";
import { CustomBaseUrl } from './CustomBaseUrl.js';

gsap.registerPlugin(ScrollTrigger);

export const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [badge, setBadge] = useState({});
  const [student,setStudent]=useState({})

  const sectionsRef = useRef([]);
  const {id}=useParams()
  useEffect(() => {

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get(`/std/stdnoti/${id}`, {
          headers: { token: token },
        });
        setStudent(response.data.data.user)
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
            <p className='text-white text-center md:ml-4'> Sno : <span> {student.sno}  </span> <br />
              Name : <span className='text-gray-200'> {student.name}  </span> <br />
              Room No : <span className='text-gray-200'> {student.roomno}  </span> <br />

              <Link to="/mydetails" className=' '><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
          <div className="md:w-[300px] w-[200px]  md:mr-3">
            <img src={register} alt="Student Register" className='sm:w-[100px] md:w-[250px] rounded-full' />
          </div>
        </div>
      </div>


      <div ref={(el) => (sectionsRef.current[1] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[300px] w-[200px]  md:ml-7">
            <img src={fees} alt="Fees" className='sm:w-[100px] md:w-[250px]' />
          </div>
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className='text-white text-center md:ml-4'>View your fee payments, track <br /> <span className='text-yellow-200'>Pending dues </span> {badge?.pendingfees > 0 && <span className='font-semibold text-red-400'> {badge.pendingfees} </span>} <br /><Link to="/fessstatement"><span className='text-blue-200'>View Details.</span></Link></p>
          </div>
        </div>
      </div>


      <div ref={(el) => (sectionsRef.current[2] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className="text-white text-center md:ml-4">
              Track your outpass status and apply for a new request easily.

              <Link to="/requeststdoutpass">
                <span className="text-blue-200 font-semibold">Apply </span>
              </Link>
              <br />
              <span className="text-yellow-200">Total Outpasses:</span>
              <span className="text-white font-semibold"> {badge?.outpasscount || 0} </span>
              <br />
              <span className="text-red-600">Request Pending:</span>
              <span className="text-white-500 font-semibold"> {badge?.reqoutpasscount || 0} </span>
              <br />
              <span className="text-green-200">Approved:</span>
              <span className="text-white-500 font-semibold"> {badge?.approvedcount || 0} </span>
              <br />
              <Link to="/stdoutview">
                <span className="text-blue-200">View Outpass Status</span>
              </Link>
            </p>
          </div>
          <div className="md:w-[300px] w-[200px]  md:mr-3">
            <img src={outpass} alt="Outpass" className='sm:w-[100px] md:w-[250px]' />
          </div>
        </div>
      </div>

      <div ref={(el) => (sectionsRef.current[3] = el)} className="section w-full md:w-[1000px] mb-12">
        <div className="flex md:justify-between w-full items-center gap-2">
          <div className="md:w-[300px] w-[200px]  md:ml-7">
            <img src={complaint} alt="Complaints" className='sm:w-[100px] md:w-[250px]' />
          </div>
          <div className="md:w-[400px] w-[200px] md:text-xl text-base">
            <p className="text-white text-center md:ml-4">
              Track your complaints and submit a new request easily.

              <Link to="/stdcomplaints">
                <span className="text-blue-300 font-medium"> Submit Complaint</span>
              </Link>
              <br />
              <span className="text-yellow-200">Pending Complaints:</span>
              <span className="text-red-500 font-semibold"> {badge?.complaintcount || 0} </span>
              <br />


              <Link to="/stdcomplaints">
                <span className="text-blue-200"> View Complaint Status</span>
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
};
