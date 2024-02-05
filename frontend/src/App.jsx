import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'

const App = () => {
  return (
    <div>
      
      
      <Routes>
        <Route path='/' element={<Registration/>}/> 
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App