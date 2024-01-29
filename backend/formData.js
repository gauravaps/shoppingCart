import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post(url, formData);
      console.log(response.data);

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
    <div>
      <h2>User Registration Form</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
