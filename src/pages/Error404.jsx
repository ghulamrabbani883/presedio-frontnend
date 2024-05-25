import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <section className='bg-gray-light w-full h-full flex flex-col justify-center items-center'>
      <h2 className='text-4xl'>Page Not Found</h2>
      <Link className='text-lg text-blue underline' to="/">Go to home page</Link>
    </section>
  )
}

export default Error404
