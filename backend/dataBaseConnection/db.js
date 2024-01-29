const mongoose=require('mongoose')

try {
    


mongoose.connect('mongodb://127.0.0.1:27017/shopuser')
  .then(() => console.log(' mongoDB Connected successfully...!'));
} catch (error) {
    console.error('connection failed ',error.message);
    
}
module.exports=mongoose;