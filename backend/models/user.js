const mongoose =require('mongoose')

const userschema=new mongoose.Schema({
    fullname:{
        
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniue:true,
        validate: {
            validator: (v) => {
                // Regular expression for email validation
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,}$/.test(v);
            },
            message: error => `${error.value} is not a valid email address`
        }
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'male',
    },
    
    phone:{ 
        type:String,
        require:true,
        validate:{
            validator:(v)=>{
                return /^d{10}$/.test(v)
            },
            message:error=>`${error.value} this is invalid number`
        }
    },
        
           

     

},{timestamps:true})

const registeruser=mongoose.model('registeruser',userschema)

module.exports=registeruser