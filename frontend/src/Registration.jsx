import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState(null); // File state

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(); // Create form data object
            formData.append('fullname', fullname);
            formData.append('email', email);
            formData.append('dob', dob);
            formData.append('gender', gender);
            formData.append('phone', phone);
            formData.append('password', password);
            formData.append('picture', picture); // Append picture file to form data
        


            const response = await axios.post('http://localhost:5000/api/adduser', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    }

        //file handel change or picture..s
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setPicture(file); // Set the file to state
    };

    return (
        <div>
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full name:</label>
                    <input type="text" name='fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name='dob' value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Picture:</label>
                    <input type="file" name='picture' onChange={handleFileChange} />
                </div>
                <button className='btn' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Registration;
