import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import '../style/contact.css';

const Contact = () => {
  return (
    <div className="containercont">
      <div className="contact-box">
        <h2 className="contactheading">Contact Us</h2>
        <div className="contact-details">
          <p className="para">
            <MapPin className="icon" size={18} color="blue" /> 
            Erode Arts and Science College
          </p>
          <p className="address">
            205, Chennimalai Road, Rangampalayam, Erode, Tamilnadu, India - 638009
          </p>
          <p className="para">
            <Phone className="icon" size={30} color="green" /> 
            <a href="tel:+914242430004">0424 2430004</a>, <a href="tel:+914242430095">0424 2430095</a>
          </p>
          <p className="para">
            <Mail className="icon" size={24} color="red" /> 
            <a href="mailto:erodearts2006@yahoo.co.in">erodearts2006@yahoo.co.in</a>
          </p>
          <p className="para">
            <Mail className="icon" size={24} color="red" /> 
            <a href="mailto:info@easc.ac.in">info@easc.ac.in</a>
          </p>
          <p className="para">
            <Globe className="icon" size={40} color="black" /> 
            <a className="clglink" href="http://www.easc.ac.in" target="_blank" rel="noopener noreferrer">
              www.easc.ac.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
