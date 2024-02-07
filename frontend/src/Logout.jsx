import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handelLogOut = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://localhost:5000/api/logout", {
        token: token,
      });
// check if tkn===1

      if (res.data.tkn === 1) {

        localStorage.removeItem("token");
        localStorage.removeItem("fname");

        navigate("/login");

      } else {
        console.log("logout failed..");
      }


    } catch (error) {
      if (error.response.data.tkn === 0) {

        alert("failed logout");
      }


      console.log(error);
      
      console.error("logout error:", error.message);

    }
  };

  return (
    <div>
      <button onClick={handelLogOut}>Logout</button>
    </div>
  );
};

export default Logout;
