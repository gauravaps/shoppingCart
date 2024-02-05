import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import "./index.css";



const Login = () => {
    const [userdata,setuserdata]=useState({
        email:'',password:''
    })
    const[errromsg,seterrromsg]=useState('')

    const handelchange=(e)=>{

        const{name,value}=e.target;
        setuserdata({...userdata,[name]:value,})
    }

    const handelsubmit=async(e)=>{
        e.preventDefault();

        try {
            if (!userdata.email.trim() || !userdata.password.trim()) {

                seterrromsg('Please fill email and password first');
                return;
            }
            const res=await axios.post('http://localhost:5000/api/login',userdata)
            console.log(res);
            if(res.data){
                alert('login successfull')
            }

        } catch (error) {
        if(error.response.data.message ==='mail id not found ,please enter valid mail id')
        {
            alert('email or password is wrong')
        }else{
            alert("Bad request. Please check your input.");

        }
        
      console.log(error);
      console.error("Error submitting form:", error.message);
            
        }

    }


  return (
    <div className="heading">
        <h2 className='login'>Login please</h2>
        <form className="formstart" onSubmit={handelsubmit}> 

        <div className="labelstart"> 
            <label  className="lab" >Email:</label>
            <input className="inputstart" type="email" name='email' placeholder=' enter email' onChange={handelchange}/>
            </div>

            <div className="labelstart"> 
                <label className="lab" >Password:</label>
            <input className="inputstart" type="password" name='password' placeholder='enter your password' onChange={handelchange}/>
            </div>

            <button className='btn1' type='submit'>login</button>
            
            {errromsg && <p className='errormsg' style={{color:'red'}}>{errromsg}</p>}
            </form>
            <h4 className='notregister'>Not registered: 👉<Link className='regLink' to={'/'}> Register</Link></h4>
        
    </div>
  )
}

export default Login