import React from 'react'

const Footer = () => {
  return (
    <div className='py-10 text-center bg-gray-800 text-white space-x-2'>

        <span className='font-bold'>@{new Date().getFullYear()}</span>
        <span>TodoList. All rights reserved</span>

    </div>
  )
}

export default Footer