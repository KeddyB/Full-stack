import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward} from 'react-icons/io'

import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transtion-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transtion-all duration-200 ease-in-out capitalize'

const categories = [
  {name: 'Animals'},
  {name: 'Wallpapers'},
  {name: 'Photography'},
  {name: 'Coding'},
  {name: 'Gaming'},
  {name: 'Other'},
  {name: 'Football'},
  {name: 'Memes'},
  {name: 'Politics'},
  {name: 'Science'},
  {name: 'Entertainment'},
  {name: 'Other'},
]

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () =>{
    if(closeToggle) closeToggle(false)
  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar md:min-w-205'>
      <div className='flex flex-col'>
        <Link 
        to='/'
        className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
        onClick={handleCloseSidebar}>
            <img src={logo} alt="Logo"  className='w-full' />
        </Link>
        <div  className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
          {categories.slice(0, categories.length - 1).map((category) =>(
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center rounded-md mx-2 hover:bg-gray-100 duration-500 ease-in-out'
        >
          <img src={user.image} className='w-7 h-7 rounded-full' alt='user' />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar