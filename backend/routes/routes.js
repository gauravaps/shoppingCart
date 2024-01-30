const express=require('express')
const route=express.Router()
const addUser =require('../controllers/userController')



//Add user router!
route.post('/adduser',addUser)






module.exports=route

