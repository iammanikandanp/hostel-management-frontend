import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'
export const StdNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigator=useNavigate()
  
    
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const closeDropdown = ()=>{
      setIsOpen(false)
    }
  
    const logOut =()=>{
      localStorage.removeItem("token")
      setIsOpen(false)
      navigator('/')
    }
  return (
   <>
       
       <div className="navbars ">
         <h1 className=" text-3xl text-center p-5">EASC</h1>
         <div className="lists">
           <ul>
             <li><Link to="/stdhome" onClick={closeDropdown}>Home</Link></li>
             <li><Link to="/fessstatement" onClick={closeDropdown}>Fees</Link></li>
             <li><Link to="/stdoutview" onClick={closeDropdown}>OutPass</Link></li>
             <li><Link to="/stdcomplaints" onClick={closeDropdown}>Complaint</Link></li>
             <li><i class="fa-solid fa-ellipsis-vertical" onClick={toggleDropdown} style={{ cursor: 'pointer' }}></i></li>
           </ul>
           {isOpen && (
           <ul
             style={{
               display:'flex',
               flexDirection:'column',
               position: 'absolute',
               top: '80px',
               right: '0',
               listStyle: 'none',
               margin: 0,
               padding: '10px',
               backgroundColor: '#fff',
               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
               borderRadius: '5px',
               zIndex: 1000,
             }}
             
           >
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/mydetails" style={{color:'#000'}} onClick={closeDropdown}>My Details</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/about" style={{color:'#000'}} onClick={closeDropdown}>About us</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/contact" style={{color:'#000'}} onClick={closeDropdown}>Contact us</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }} onClick={logOut}>Logout</li>
           </ul>
         )}
         </div>
       </div>
       <div className="navbar1 bg-opacity-5 bg-black">
         <h1 className="text-3xl text-center p-5">EASC</h1>
         <div className="lists">
           <ul>
             <li><Link to="/stdhome" style={{color:'#fff'}} onClick={closeDropdown}>Home</Link></li>
             <li><i class="fa-solid fa-ellipsis-vertical" onClick={toggleDropdown} style={{ cursor: 'pointer' }}></i></li>
           </ul>
           {isOpen && (
           <ul
             style={{
               display:'flex',
               flexDirection:'column',
               position: 'absolute',
               top: '80px',
               right: '0',
               listStyle: 'none',
               margin: 0,
               padding: '10px',
               backgroundColor: '#fff',
               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
               borderRadius: '5px',
               zIndex: 1000,
             }}
           >
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/fessstatement" onClick={closeDropdown}>Fees</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/stdoutview" onClick={closeDropdown}>OutPass</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/stdcomplaints" onClick={closeDropdown}>Complaints</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/mydetails" onClick={closeDropdown}>My Details</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/about" style={{color:'#000'}} onClick={closeDropdown}>About us</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/contact" style={{color:'#000'}} onClick={closeDropdown}>Contact us</Link></li>
             <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }} onClick={logOut}>Logout</li>
           </ul>
         )}
         </div>
       </div>
       </> 
  )
}
