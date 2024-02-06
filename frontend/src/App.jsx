import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Home from "./Home";
import axios from "axios";


const App = () => {
  

  //get token from localStorage..

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.post("http://localhost:5000/api/token", {
          token: token,
        });
        console.log(res);
        if (res.status === 200) {
        
          console.log("Token received successfully!");
        }
         
        
      } catch (error) {
        //if sts value is ===0;
         if(error.response.data.sts===0){
           localStorage.removeItem('token');

         }
        console.log(error);
      }
    };

    getToken();

  },[]);

  // home page restriction ..
  
  const navigate=useNavigate()
    const tokens=localStorage.getItem('token')
    console.log(tokens);

    useEffect(()=>{
      if(tokens===null){
        navigate('/login')

      }
    },[tokens])


  return (
    <div>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
