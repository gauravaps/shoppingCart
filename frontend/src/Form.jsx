import React, { useState } from 'react'
import axios from "axios";


const Login = () => {
    const [userdata,setuserdata]=useState({
        email:'',password:''
    })

    const handelchange=(e)=>{

        const{name,value}=e.target;
        setuserdata({...userdata,[name]:value,})
    }

    const handelsubmit=async(e)=>{
        e.preventDefault();

        try {
            const res=await axios.post('http://localhost:5000/api/login',userdata)
            console.log(res);

        } catch (error) {
        console.error(error);
            
        }

    }


  return (
    <div>
        

            <input type="email" name='email' placeholder=' enter email' onChange={handelchange}/>
            <input type="password" name='password' placeholder='enter your password' onChange={handelchange}/>
            <button onClick={handelsubmit} type='submit'>login</button>
        
    </div>
  )
}

//export default Login