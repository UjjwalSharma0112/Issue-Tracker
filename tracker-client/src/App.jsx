import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Test from './Pages/Test.jsx';
function App() {

  
  
  return (<>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
  </>)
}

export default App;
