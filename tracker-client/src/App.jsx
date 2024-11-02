import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Test from './Pages/Test.jsx';
import Signup from './Pages/Signup.jsx';
import Home from './Pages/Home.jsx';
function App() {

  
  
  return (<>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
  </>)
}

export default App;
