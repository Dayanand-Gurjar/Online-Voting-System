import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './MyComponents/Home';
import Elections from './MyComponents/Elections';
import Register from './MyComponents/Register'
import Login from './MyComponents/Login';
import Votepage from './MyComponents/Votepage';
import Result from './MyComponents/Result';
import Navbar from './MyComponents/Navbar';
import Voters from './MyComponents/Voters';
import Addelection from './MyComponents/Addelection';
import Nominee from "./MyComponents/Nomination";


const accessContext=React.createContext(0);


function App() {
  return (
    <>
    <accessContext.Provider value={0}>
    <Navbar/>
    </accessContext.Provider>
    
    <Routes>
          <Route exact path='/elections' element={<Elections/>}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/votepage/:id' element={<Votepage/>}/>
          <Route exact path='/result/:id' element={<Result/>}/>
          <Route exact path='/voters' element={<Voters/>}/>
          <Route exact path='/addelection' element={<Addelection/>}/>
          <Route exact path='/nominee/:id' element={<Nominee/>}/>
          <Route exact path='/' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
