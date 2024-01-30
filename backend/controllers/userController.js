const registeruser=require('../models/user')



// Add user
const addUser=async(req,res)=>{
    try {
        // get data from body
        const{fullname,email,dob,gender,phone}=req.body;

        if(!fullname || !email || !dob || !gender || !phone){
           return res.status(400).json('all fields are required please fill')
        }

        const userExist= registeruser.findOne({email})

        if(userExist){
            res.status(400).json('user already registered!')
        }


        const newuser=  new registeruser({
            fullname,
            email, 
            dob,
            gender,
            phone,
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



