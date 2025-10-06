import React, { createContext, useContext,useEffect,useState } from 'react'
import { axiosClient } from '../utils/axiosClient'
import { Navigate, useNavigate } from 'react-router-dom'
import MainLoader from '../component/MainLoader'
import { toast } from 'react-toastify'


export const mainContext = createContext()
export const useMainContext = () => useContext(mainContext)


export const MainContext = ({children}) => {
const navigate = useNavigate()
  const [todo, setTodo] = useState([]);

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  const logoutHandler = () => {
   try {
    
     localStorage.removeItem('user')
    setUser(null)
   toast.success("logged out successfully")
    navigate('/login')

   } catch (error) {
    console.log(error);
    
   }
    
  }


  const fetchTasks = async () => {
    try {
      
  const res = await axiosClient.get('/',{
    headers:{
      'user':localStorage.getItem('user') || ''
    }
  })
  
  // console.log('Task data',res?.data);
  setTodo(res.data)
  
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
  
    }
  }

const fetchProfile = async () => {

try {
  setLoading(true)
const token = localStorage.getItem('user')
if(!token) return

  const res = await axiosClient.get('/profile',{headers:{user:token}})

  setUser(res.data)
// console.log(res.data);
await fetchTasks()

} catch (error) {
  console.log(error.message);
  
}finally{
  setLoading(false)
}


}




useEffect(()=>{
  fetchProfile()
},[])

if(loading) {
  return <MainLoader/>
}

  return (
    <mainContext.Provider value={{user,logoutHandler,fetchProfile,fetchTasks,todo}}>
        {children}
    </mainContext.Provider>
  )
}
