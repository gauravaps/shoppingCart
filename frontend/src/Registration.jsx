import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

const Registration = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(""); // File state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simple email validation using regex
      const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      };

      //phone number validation using regex
      const isValidPhone = (phone) => {
        return /^\d{10}$/.test(phone);
      };

      // Frontend validation for email and phone fields

      if (!isValidEmail(email)) {
        console.log(email);
        //throw new Error('Please enter a valid email address'); 
        alert("Please enter a valid email address");
        return;
      }

      if (!isValidPhone(phone)) {
        //throw new Error('Please enter a valid phone number');

        alert("Please enter valid phone number");
        return;
      }
      const formData = new FormData(); // Create form data object
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("picture", picture); // Append picture file to form data

      const response = await axios.post(
        "http://localhost:5000/api/adduser",
        formData
      );

      // if user registration successfull or failed..
      if (response.data) {
        alert("User registered successfull");
      } else {
        alert("user registration failed !!");
      }

      // Reset form fields
      setFullname("");
      setEmail("");
      setDob("");
      setGender("male");
      setPhone("");
      setPassword("");
      setPicture("");



    } catch (error) {
      if (error.response.data.message === "user already registered!") {
        alert("User already registered!");
      } else {
        alert("Bad request. Please check your input.");
      }
      console.log(error);
      console.error("Error submitting form:", error.message);
    }
  };



  //file handel change or picture..s
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setPicture(file); // Set the file to state
  };

  return (
    <div className="heading">
      {/* <h2>User Registration Form</h2> */}
      <div className="login">
    <h2>
        <span>User Registration Form</span>
    </h2>
</div>
      <form className="formstart" onSubmit={handleSubmit}>
        <div className="labelstart">
          <label className="lab">Full name:</label>
          <input
            className="inputstart"
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="labelstart">
          <label className="lab">Email:</label>
          <input
            className="inputstart"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="labelstart">
          <label className="lab"> Date of Birth:</label>
          <input
            className="inputstart"
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="labelstart">
          <label className="lab">Gender:</label>
          <select
            className="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="labelstart">
          <label className="lab">Phone:</label>
          <input
            className="inputstart"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="labelstart">
          <label className="lab">Password:</label>
          <input
            className="inputstart"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="labelstart">
          <label className="lab">Picture:</label>
          <input
            className="inputstart"
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <h4 className='notregister'>Already registered ..<Link className='regLink' to={'/login'}>Login here </Link>  </h4>
      
    </div>
  );
};

export default Registration;
