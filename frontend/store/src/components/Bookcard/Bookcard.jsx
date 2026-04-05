import React from 'react'
import { Link } from 'react-router-dom'

const Bookcard = ({data}) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center'>
      <Link to={`/book/${data._id}`} className='w-full'>
        <img src={data.url} alt={data.title} className='w-50 h-[30vh] object-cover rounded-md mb-4 mx-2' />
        <h3 className='text-lg font-semibold text-gray-800'>{data.title}</h3>
        <p className='text-gray-600'>by {data.author}</p>
        <p className='text-gray-600'>₹{data.price}</p>
      </Link>
    </div>
  )
}

export default Bookcard