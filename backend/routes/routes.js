const express=require('express')
const route=express.Router()
const multer=require('multer')


//mutler configuration ..
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./uploads') // Uploads folder where files will be stored
    },
    filename:function(req,file,cb){
      cb(null,Date.now()+'-'+file.originalname) // file naming
    }
    
  })
  
  //upload file here...
  const upload=multer({storage:storage}) 

const {addUser,getUser,getsingleUser,deleteUser,updateUser,updateUserPassword} =require('../controllers/userController')



//Add user router!
route.post('/adduser',upload.single('picture'), addUser)

//get user Data!1
route.get('/getuser',getUser)

//get single user ..!!
route.get('/single/:val',getsingleUser)

// Delete user ...!!
route.delete('/delete/:id',deleteUser)

// update user ...!!
route.patch('/update/:id',updateUser)

//update user password..!!
route.patch('/password/:id',updateUserPassword)






module.exports=route

