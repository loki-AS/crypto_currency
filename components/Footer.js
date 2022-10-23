import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsSearch, BsNewspaper } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi'

const Footer = () => {
  return (
    <footer className='flex sticky bottom-0 justify-evenly dark:bg-[#0d1116] bg-gray-100 py-6'>
            <div className='cursor-pointer transition transform duration-200 ease-out hover:scale-105'>
        <div className='flex text-center justify-center'>
        <AiFillHome size={30} />          
        </div>
        <h1 className='text-gray-500 font-poppins'>Home</h1>
      </div>

      <div className='cursor-pointer transition transform duration-200 ease-out hover:scale-105'>
      <div className='flex text-center justify-center'>
      <BsSearch size={30} />        
      </div>
      <h1 className='text-gray-500 font-poppins'>Search</h1>
      </div>

      <div className='cursor-pointer transition transform duration-200 ease-out hover:scale-105'>
      <div className='flex text-center justify-center'>
      <BsNewspaper size={30} />        
      </div>
      <h1 className='text-gray-500 font-poppins'>News</h1>
      </div>

      <div className='cursor-pointer transition transform duration-200 ease-out hover:scale-105'>
      <div className='flex text-center justify-center'>
      <BiUserCircle size={30} />        
      </div>
      <h1 className='text-gray-500 font-poppins'>Users</h1>
      </div>
    </footer>
  )
}

export default Footer