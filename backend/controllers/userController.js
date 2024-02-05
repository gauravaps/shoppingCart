const registeruser = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')
require('dotenv').config




// Add user
const addUser = async (req, res) => {
  try {
    // get data from body
    const { fullname, email, dob, gender, phone, password } = req.body;

    // check if any require fields are empty
    if (!fullname || !email || !dob || !gender || !phone || !password) {
      return res.status(400).json({error: "all fields are required please fill"});
    }

    // check if user is already registered!
    const userExist = await registeruser.findOne({ email });

    if (userExist) {
     return res.status(400).json({message:"user already registered!"});
    }

    // hashing password
    const hashedpassword = await bcrypt.hash(password, 10);

    // file path req.file
    const pictures=req.file.path;

    // register new users!!1
    const newuser = new registeruser({
      fullname,
      email,
      dob,
      gender,
      phone,
      password: hashedpassword,
      picture:pictures
    });
    // save user
    const saveuser = await newuser.save();
    console.log(saveuser);

    res.status(200).json({ message: "user created successfull", saveuser });
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
    const { val } = req.params;
    const signleuser = await registeruser.findById({ _id: val });

    if (!signleuser) {
      // if user didn't get
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: signleuser });
  } catch (error) {
    res.status(500).json({ "No user found something wrong": error });
  }
};

//delete user...
const deleteUser = async (req, res) => {
  try {
    // to get id from req.params
    const { id } = req.params;
    const removeuser = await registeruser.findByIdAndDelete({ _id: id });

    // if did not get user to delete
    if (!removeuser) {
      res.status(500).json({ message: "user not found" });
    }

    res.status(200).json({ "user deleted successfully": removeuser });
  } catch (error) {
    res.status(500).json({ "No user found to delete": error });
  }
};

//Update user...!!!!
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, dob, gender, phone, password } = req.body;

    // find user by ID..
    const updatedUser = await registeruser.findByIdAndUpdate(
      id,
      { fullname, email, dob, gender, phone, password },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};


// Update Password by using OlDpassword
const updateUserPassword=async(req,res)=>{
  try {
    const {id} =req.params;

    const {oldpassword,newpassword} =req.body;

    //FIND USER BY ID!
    const user= await registeruser.findById(id);

    if(!user){
      return res.status(404).json({ message: 'User not found' });

    }

    //VERIFY OLD PASSWORD!!
    const isPasswordVerify=await bcrypt.compare(oldpassword,user.password)

    //CHECK OLD PASSWORD IS  VERYFIED OR NOT!!
    if(!isPasswordVerify){
      return res.status(400).json({ message: 'Old password is incorrect' });

    }

    // HASHING  NEW PASSWORD !!!
    const passwordhash=await bcrypt.hash(newpassword,10)

    //PASSWORD HASHED WITH NEW PASSWORD
    const passwordupdate=await registeruser.findByIdAndUpdate(id,{password:passwordhash},{new:true})

    res.status(200).json({message: 'Password updated successfully', user: passwordupdate})


  } catch (error) {
    res.status(500).json({message:'Something went wrong', error: error.message})
    
  }
}

//Login user...!!

const loginUser=async(req,res)=>{
  
  try {
    const {email,password}=req.body;
    const login=await registeruser.findOne({email:email})

    //IF DID NOT FIND ANY USER
    if(!login){
      
     return res.status(500).json({message:'mail id not found ,please enter valid mail id'})
    } 

    // CREATE JWT TOKEN...!
    const token =await jwt.sign({email},process.env.SECRET_TOKEN,{expiresIn:'1hr'})

    //IF PASSWORD MATCH
    const getuser1=await bcrypt.compare(password,login.password)

    // if(await bcrypt.compare(password,login.password))


    //IF GETUSER1 IS FOUND OR TRUE ..
    if(getuser1){
      return res.status(200).json({message:'User login successfull','token':token})
    }else{
     return res.status(500).json({message:'Password not match'}) 
    }
    
  } catch (error) {
    
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Internal server error' });
    
  }
}


module.exports = { addUser, getUser, getsingleUser, deleteUser, updateUser ,updateUserPassword,loginUser};
