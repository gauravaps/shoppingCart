const express=require('express')
const route=express.Router()
const {addUser,loginUser,logoutUser} =require('../controllers/userController')



//Add user router!
route.post('/addusser',addUser)






module.exports=route