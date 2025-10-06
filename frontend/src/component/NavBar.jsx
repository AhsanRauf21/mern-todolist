import React from 'react'
import { LuListTodo } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useMainContext } from '../context/MainContext';
import { toast } from 'react-toastify';
const NavBar = () => {

const {user,logoutHandler} = useMainContext()

  return (
    
<header className='p-2 flex justify-between items-center bg-gray-800' >
    
   {
    user ?  <Link to={'/'} className='flex gap-x-2'>

    <LuListTodo className='text-blue-300 text-4xl'/>
<h1 className='text-2xl font-bold text-blue-300'>Todo List</h1>
    </Link> :
    <button onClick={() => {toast.error('Login first')}}>
       <div className='flex gap-x-2'>

    <LuListTodo className='text-blue-300 text-4xl'/>
<h1 className='text-2xl font-bold text-blue-300'>Todo List</h1>
    </div>

    </button>

   }
{
  user? <button onClick={logoutHandler} className='text-lg font-semibold py-2   hover:rounded  hover:bg-blue-300 px-4.5  transition duration-150 hover:text-white text-blue-300'>
    Logout
</button> :
<Link to={'/login'} className='text-lg font-semibold py-2   hover:rounded  hover:bg-blue-300 px-4.5  transition duration-150 hover:text-white text-blue-300'>
    Login
</Link>
}

</header>


  )
}

export default NavBar