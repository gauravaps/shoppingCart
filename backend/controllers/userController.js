const registeruser=require('../models/user')




const addUser=(async(req,res)=>{
    try {
        // Data from request body
        const { fullname, email, dob, gender, phone } = req.body;

        // Create new user instance
        const newUser = new registeruser({
            fullname,
            email,
            dob,
            gender,
            phone
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Send response
        res.status(201).json({ message: 'User added successfully', user: savedUser });

    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

    


});

const loginUser=async(()=>{
    try {
        
    } catch (error) {
        
    }
})

const logoutUser=async(()=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports={addUser,loginUser,logoutUser}