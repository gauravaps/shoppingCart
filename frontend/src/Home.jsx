import React from 'react'


const Home = () => {
  const tokens=localStorage.getItem('token')
  const fname=localStorage.getItem('fname')

  

  return (
    <div>
    <h1>welcome to home page </h1>
    <p>token:{tokens}</p>
    <p>fullname:{fname}</p>
    
    </div>
  )
}

export default Home