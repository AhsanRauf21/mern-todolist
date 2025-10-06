import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useMainContext } from '../context/MainContext'
import MainLoader from '../component/MainLoader'

const ProtectedLayer = () => {
const {user} = useMainContext()
const [loading,setLoading] = useState(true)
const navigate = useNavigate()
useEffect(()=>{
if(!user) navigate('/login')
else setLoading(false)
},[user])


if(loading){
    return <MainLoader/>
}
  return (
    <>
    
    <Outlet/>
    </>
  )
}

export default ProtectedLayer