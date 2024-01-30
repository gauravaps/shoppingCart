const express=require('express')
const route=express.Router()
const {addUser,getUser,getsingleUser,deleteUser} =require('../controllers/userController')



//Add user router!
route.post('/adduser',addUser)

//get user Data!1
route.get('/getuser',getUser)

//get single user ..!!
route.get('/single/:val',getsingleUser)

// Delete user ...!!
route.delete('/delete/:id',deleteUser)






module.exports=route

