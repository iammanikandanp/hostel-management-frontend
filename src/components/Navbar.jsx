import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'



export const Navbar = () => {
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
    
    <div className="navbars bg-opacity-5 bg-black">
      <h1 className="text-3xl text-center p-5">EASC</h1>
      <div className="lists">
        <ul>
          <li><Link to="/adminhome" onClick={closeDropdown}>Home</Link></li>
          <li><Link to="/allfesspayments" onClick={closeDropdown}>Fees</Link></li>
          <li><Link to="/stdreg" onClick={closeDropdown}>Student Register</Link></li>
          <li><Link to="/stddetails" onClick={closeDropdown}>Std Details</Link></li>
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
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/roomallocation" style={{color:'#000'}} onClick={closeDropdown}>Room Alocation</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/stdoutpassview" style={{color:'#000'}} onClick={closeDropdown}>Out Pass</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/allcomplaints" style={{color:'#000'}} onClick={closeDropdown}>Complaints</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/addadmin" style={{color:'#000'}} onClick={closeDropdown}>Add Admin</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }} onClick={logOut}>Logout</li>
        </ul>
      )}
      </div>
    </div>
    <div className="navbar1 bg-opacity-10 bg-white ">
    <h1 className="text-3xl text-center p-5">EASC</h1>

      <div className="lists">
        <ul>
          <li><Link to="/adminhome" style={{color:'#fff'}} onClick={closeDropdown}>Home</Link></li>
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
          <li  style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/allfesspayments" onClick={closeDropdown}>Fees</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/stdreg" onClick={closeDropdown}>Student Register</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/stddetails" onClick={closeDropdown}>Std Details</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/roomallocation" onClick={closeDropdown}>Room Alocation</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/stdoutpassview" onClick={closeDropdown}>Out Pass</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}> <Link to="/allcomplaints" style={{color:'#000'}} onClick={closeDropdown}>Complaints</Link> </li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }}><Link to="/addadmin" style={{color:'#000'}} onClick={closeDropdown}>Add Admin</Link></li>
          <li style={{ padding: '5px 10px', cursor: 'pointer' , color:'#000' }} onClick={logOut}>Logout</li>
        </ul>
      )}
      </div>
    </div>
    </>
  )
}
