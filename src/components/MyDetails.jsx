import React, { useEffect, useState } from "react";
import "../style/ProfileCard.css";
import image from "../assets/img/profile.jpg"
import { CustomBaseUrl } from "./CustomBaseUrl.js";
export const MyDetails = () => {


    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await CustomBaseUrl.get("/std/userdetails", {
                    headers: {
                        token: token,
                    }
                });

                setUserDetails(response.data.data); 
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    if (!userDetails) {
        return <p>Loading...</p>; 
    }

    return (
<div className="outpass">
        <div class="profile-card ">
        <div class="profile-card-image">
          <img src={image} alt="User Profile"  />
        </div>
        <div class="profile-card-content">
          <div class="profile-card-header">
            <h2>Welcome {userDetails.name}!</h2>
          </div>
          <div class="profile-card-body">
            <p><strong>Sno:</strong> {userDetails.sno}</p>
            <p><strong>Room No:</strong> {userDetails.roomno}</p>
            <p><strong>Roll No:</strong> {userDetails.rollno}</p>
            <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
            <p><strong>Class:</strong> {userDetails.class}</p>
            <p><strong>Department:</strong> {userDetails.dept}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
            <p><strong>Phone Number:</strong> {userDetails.phno}</p>
            <p><strong>Parent's Phone:</strong> {userDetails.parentphno}</p>
            <p><strong>Status:</strong><span style={{ color: userDetails.status === "Active" ? "green" : "red" , fontWeight:600}}> {userDetails.status}</span>
</p>
          </div>
        </div>
      </div>
      </div>

    );



}