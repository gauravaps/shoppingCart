const registeruser=require('../models/user')
const bcrypt=require('bcryptjs')



// Add user
const addUser=async(req,res)=>{
    try {
        // get data from body
        const{fullname,email,dob,gender,phone,password}=req.body;

        // check if any require fields are empty
        if(!fullname || !email || !dob || !gender || !phone || !password){
           return res.status(400).json('all fields are required please fill')
        }

            // check if user is already registered!
        const userExist=await registeruser.findOne({email})

        if(userExist){
            res.status(400).json('user already registered!')

        }

        // hashing password
        const hashedpassword = await bcrypt.hash(password, 10);



        const newuser=  new registeruser({
            fullname,
            email, 
            dob,
            gender,
            phone,
            password:hashedpassword
        })
        // save user
        const saveuser=await newuser.save() 
        console.log(saveuser);
        
        res.status(200).json({'user':'user created successfull',saveuser})
        ;


        
    } catch (error) {
        res.status(500).json({"error":error}) 
        
    }
   

};


module.exports=addUser



