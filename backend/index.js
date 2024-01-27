const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')

const app=express()
//use cors
app.use(cors())

//use body-parser for json and URL incoded..
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const port=process.env.PORT || 5000

app.use((req,res)=>{
    res.json({mesg:'this is shopping cart...'})
})

app.listen(port,console.log('express running..'))