const registeruser = require("../models/user");
const bcrypt = require("bcryptjs");

// Add user
const addUser = async (req, res) => {
  try {
    // get data from body
    const { fullname, email, dob, gender, phone, password } = req.body;

    // check if any require fields are empty
    if (!fullname || !email || !dob || !gender || !phone || !password) {
      return res.status(400).json("all fields are required please fill");
    }

    // check if user is already registered!
    const userExist = await registeruser.findOne({ email });

    if (userExist) {
      res.status(400).json("user already registered!");
    }

    // hashing password
    const hashedpassword = await bcrypt.hash(password, 10);

    // register new users!!1
    const newuser = new registeruser({
      fullname,
      email,
      dob,
      gender,
      phone,
      password: hashedpassword,
    });
    // save user
    const saveuser = await newuser.save();
    console.log(saveuser);

    res.status(200).json({ user: "user created successfull", saveuser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get all users !!!
const getUser = async (req, res) => {
  try {
    const allUser = await registeruser.find();
    res.status(200).json({ users: allUser });
  } catch (error) {
    res.status(500).json({ "user not found": error });
  }
};
// get signle user.!
const getsingleUser = async (req, res) => {
  try {
    //to get is we can use any name like id,val anything =req.params
    const {val} = req.params;;
    const signleuser = await registeruser.findById({ _id:val });

    if (!signleuser) {
      // if user didn't get
      return res.status(404).json({ message: "User not found" }); 
    }

    res.status(200).json({ 'user': signleuser });

  } catch (error) {
    res.status(500).json({ "No user found something wrong": error });
  }
};


//delete user...
const deleteUser=async(req,res)=>{
try {
    
        // to get id from req.params
        const {id} =req.params;
        const removeuser=await registeruser.findByIdAndDelete({_id:id})

        // if did not get user to delete
        if(!removeuser){
            res.status(500).json({message:'user not found'})
        }

        res.status(200).json({'user deleted successfully':removeuser})


} catch (error) {
    res.status(500).json({'No user found to delete':error})
    
}
}

//Update user...!!!!
const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { fullname, email, dob, gender, phone ,password} = req.body;

      // // Find user by ID
       //const user = await registeruser.findById(id);

      // if (!user) {
      //     return res.status(404).json({ message: 'User not found' });
      // }

      // // Verify old password
     //const isPasswordValid = await bcrypt.compare(password, user.password);

     // if (!isPasswordValid) {
       //    return res.status(400).json({ message: 'Old password does not match' });
      //}

      // // Hash the new password
      //const hashedPassword = await bcrypt.hash(password, 10);

      // Update user with hashed password
      const updatedUser = await registeruser.findByIdAndUpdate(
          id,
          { fullname, email, dob, gender, phone,password},
          { new: true }
      );

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};







module.exports = { addUser, getUser, getsingleUser ,deleteUser,updateUser};
