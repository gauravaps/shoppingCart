import React, {  useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });
  const [errromsg, seterrromsg] = useState("");

  const navigate=useNavigate()

  const handelchange = (e) => {
    const { name, value } = e.target;
    setuserdata({ ...userdata, [name]: value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userdata.email.trim() || !userdata.password.trim()) {
         seterrromsg("Please fill email and password first");
        return;
      }
      seterrromsg('')
      const res = await axios.post("http://localhost:5000/api/login", userdata);
      console.log(res.data.fname);
      if (res.data.token) {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('fname',res.data.fname)
        navigate('/home')
        alert("login successfull");

      }


    } catch (error) {
        console.log(error.response); // Response object ko console par log karein
        if (error.response && error.response.data && error.response.data.message === "mail id not found ,please enter valid mail id") {
          alert("email or password is wrong");
        } else {
          alert("Bad request. Please check your input.");
        }
        
        console.error("Error submitting form:", error.message);
        console.log(error);
      }
      
  };



  return (
    <div className="heading">
      <div className="login">
    <h2>
        <span>Login please</span>
    </h2>
</div>

      <form className="formstart" onSubmit={handelsubmit}>
        <div className="labelstart">
          <label className="lab">Email:</label>
          <input
            className="inputstart"
            type="email"
            name="email"
            placeholder=" enter ypur email"
            onChange={handelchange}
          />
        </div>

        <div className="labelstart">
          <label className="lab">Password:</label>
          <input
            className="inputstart"
            type="password"
            name="password"
            placeholder="enter your password"
            onChange={handelchange}
          />
        </div>

        <button className="btn1" type="submit">
          login
        </button>

        {errromsg && (
          <p className="errormsg" style={{ color: "red" }}>
            {errromsg}
          </p>
        )}
      </form>

      <h3 className="notregister">
        Not registered: 👉
        <Link className="regLink" to={"/"}>
          {" "}
          Register
        </Link>
      </h3>

    </div>
  );
};

export default Login;
