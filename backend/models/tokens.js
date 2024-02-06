const mongoose=require('mongoose')

const tokenSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'registeruser',
        required:true,
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
    

},{timeseries:true});

tokenSchema.index({expiresAt:1},{expireAfterSeconds:0});

const token=mongoose.model('token',tokenSchema);

 module.exports=token