import React, { useState } from 'react';
import './index.css'
//import axios from 'axios';

function UserForm() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Frontend validation for email and phone fields
      if (!validateEmail(email)) {
        //throw new Error('Please enter a valid email address');
        alert('Please enter a valid email address')
        return ;
      }

      if (!validatePhone(phone)) {
        //throw new Error('Please enter a valid phone number');
        alert('Please enter a valid mobile number')
        return ;
      }

      // Backend URL
      const url = 'http://your-backend-url.com/api/users';

      // Form data
      const formData = {
        fullname,
        email,
        dob,
        gender,
        phone
      };

      // Backend POST request
     // const response = await axios.post(url, formData);
      //console.log(response.data);

      // Reset form fields
      setFullname('');
      setEmail('');
      setDob('');
      setGender('male');
      setPhone('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setErrorMessage(error.message);
    }
  };

  const validateEmail = (email) => {
    // Simple email validation using regex
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    // Simple phone number validation using regex
    return /^\d{10}$/.test(phone);
  };

  return (
    <div className='heading'>
      <h2>User Registration Form</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className='formstart' onSubmit={handleSubmit}>
        <div className='labelstart'>
          <label className='lab'>Full Name:</label>
          <input className='inputstart' type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <div className='labelstart'>
          <label className='lab'>Email:</label>
          <input className='inputstart' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='labelstart'>
          <label className='lab'>Date of Birth:</label>
          <input className='inputstart' type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className='labelstart'>
          <label className='lab'>Gender:</label>
          <select className='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className='labelstart'>
          <label className='lab'>Phone:</label>
          <input className='inputstart' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button className='btn' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;


////////////////////////+++++++++++++++

import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const[fullname,setfullname]=useState('')
    const [email, setemail] = useState('');
    const [dob, setdob] = useState('');
     const [gender, setgender] = useState('male');
     const [phone, setphone] = useState('');
     const[password,setpassword]=useState('')
     const [Picture,setPicture]=useState(null)
     const [errorMessage, setErrorMessage] = useState('');

     
     const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
      };

     const handleSubmit= async(e)=>{
        e.preventDefault(); 
        
        

        try {
            
        
            const formData={fullname,email,dob,gender,phone,password,Picture}


            const response=await axios.post('http://localhost:5000/api/adduser',formData)

            console.log(response.data);





            
        } catch (error) {
            console.error('Error submitting form:', error.message);
             setErrorMessage(error.message);
            
        }
     }
     




  return (
    <div>
              <h2>User Registration Form</h2>

              <form action='post' onSubmit={handleSubmit}>
                <div>
                    <label>Full name:</label>
                    <input type="text" name='fullname'value={fullname} onChange={(e)=> setfullname(e.target.value)} />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name='email' value={email} onChange={(e)=> setemail(e.target.value)}/>
                </div>

                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name='dob' value={dob} onChange={(e)=> setdob(e.target.value)} />
                </div>

                <div>
                    <label>Gender:</label>
                    <select name="gender"  value={gender} onChange={(e)=> setgender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">other</option>
                    </select>
                </div>

                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e)=> setphone(e.target.value)} />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                </div>

                <div>
                    <label>Picture:</label>
                    <input type="file" name='picture'  onChange={handleFileChange}/> 
                </div>

                <button className='btn' type="submit">Submit</button>



              </form>

    </div>
  )
}

//export default Registration