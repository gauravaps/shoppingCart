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
            validator: /^\d{10}$/

         },

        // validator:(v)=>{
        //     return /^\d{10}$/.test(v);

        // },
        // message:error =>`${error.value} this is not a valid number`

    }

},{timestamps:true})

const registeruser=mongoose.model('registeruser',userschema)

module.exports=registeruser