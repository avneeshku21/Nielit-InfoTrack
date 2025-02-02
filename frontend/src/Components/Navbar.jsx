import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
function Navbar() {
  const [show,setShow]=useState(false)
  return (
    <>
     <nav className='shadow-lg px-4 py-3'>
        <div className='flex items-center justify-between container mx-auto'>
          <div className='font-semibold text-xl'>Nielit-<span className='text-blue-600'>Track</span></div>

{/* desktop */}
          <div className='mx-6'>
            <ul className='space-x-6 hidden md:flex'>
            <Link to="/" className='hover:text-blue-600'>HOME</Link>
            <Link to="/courses" className='hover:text-blue-600'>COURSE</Link>
            <Link to="/creators" className='hover:text-blue-600'>CREATORS</Link>
            <Link to="/about" className='hover:text-blue-600'>ABOUT</Link>
            <Link to="/contact" className='hover:text-blue-600'>CONTACT</Link>
            </ul>
<div className='md:hidden' onClick={()=>setShow(!show)}>{show?<IoCloseSharp size={24}/>:<AiOutlineMenu size={24}/>}

</div>


            </div>
          <div className='space-x-2 hidden md:flex'>
            <Link to ="/dasboard" className='bg-blue-600 text-white font-semibold hover:bg-blue-800 
             duration-300 px-4 py-2 rounded-md'>Dasboard</Link>
            <Link to ="/login" className='bg-red-600 text-white font-semibold hover:bg-red-800 
             duration-300 px-4 py-2 rounded-md'>Login</Link>
          </div>
        </div>
        {/* mobile Navbar */}
        {show && (
          <div className='bg-white h-screen flex items-center justify-center md:hidden'>
                <ul className='flex flex-col space-y-6 text-xl text-center'>
            <Link to="/" smooth={true} 
  duration={500} 
  offset={-700} 
  className="hover:text-blue-600"
  onClick={() => setShow(!show)}>HOME</Link>
            <Link to="/stocks" smooth={true} 
  duration={500} 
  offset={-700} 
  className="hover:text-blue-600"
  onClick={() => setShow(!show)}>COURSE</Link>
            <Link to="/creators" smooth={true} 
  duration={500} 
  offset={-700} 
  className="hover:text-blue-600"
  onClick={() => setShow(!show)}>CREATORS</Link>
            <Link to="/about" smooth={true} 
  duration={500} 
  offset={-700} 
  className="hover:text-blue-600"
  onClick={() => setShow(!show)}>ABOUT</Link>
            <Link to="/contact" smooth={true} 
  duration={500} 
  offset={-700} 
  className="hover:text-blue-600"
  onClick={() => setShow(!show)}>CONTACT</Link>
            </ul>
          </div>
        )}



      </nav>
    </>
  )
}

export default Navbar
