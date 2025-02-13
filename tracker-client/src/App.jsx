import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Pages/Signup.jsx';
import Home from './Pages/Home.jsx';
import Signin from './Pages/Signin.jsx';
import Test from './Pages/Test.jsx';
function App() {

  
  
  return (<>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
  </>)
}

export default App;
