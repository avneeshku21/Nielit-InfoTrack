import React from "react";
import {  Routes,Route, useLocation} from "react-router-dom";
import Navbar from "../src/Components/Navbar.jsx"
import Home from "../src/Components/Home.jsx"
import Footer from "../src/Components/Footer.jsx"
import Courses from "../src/pages/Courses.jsx"
import About from "../src/pages/About.jsx"
import Contact from "../src/pages/Contact.jsx"
import Login from "../src/pages/Login.jsx"
import Register from "../src/pages/Register.jsx"
import Dasboard from "./pages/Dashboard.jsx"
import { useAuth } from "./context/AuthProvider.jsx";
import Creator from "./Home/Creator.jsx";
import Detail from "./pages/Details.jsx";
import CourseSchedule from "./pages/CourseSchedule.jsx"

import AllContests from "./pages/AllContests.jsx";

function App() {
 const location =useLocation()
 const hideNavbarFooter=["/dasboard","/login","/register"].includes(location.pathname)


const {courses}=useAuth()
console.log(courses)
  return (
   <>
   {!hideNavbarFooter&&<Navbar/>}
   <Routes>

   <Route exact path="/"element={<Home/>}/>
   <Route exact path="/courses" element={<Courses/>}/>
   <Route exact path="/creators" element={<Creator/>}/>
   <Route exact path="/about" element={<About/>}/>
   <Route exact path="/contact"element={<Contact/>}/>
   <Route exact path="/login"element={<Login/>}/>
   <Route path="/course-schedule" element={<CourseSchedule />} />
   <Route exact path="/register"element={<Register/>}/>
   <Route exact path="/dashboard"element={<Dasboard/>}/>

   <Route exact path="/courses/:id" element={<Detail />} />
  
   <Route path="/contests" element={<AllContests />} />

   </Routes>
  { !hideNavbarFooter&&<Footer/>}
  

   </>
  );
}

export default App;
