import React from 'react'

const Hom = () => {
  return (
    <div className='h-[75vh] flex '>
        <div className='w-3/6 flex justify-center flex-col items-center'>
        <h1 className='text-6xl font-semibold text-yellow-100'>Discover the Books here which will be a key to unlock your future</h1>
        <p className='mt-4 text-xl text-200  text-zinc-100'>Discover your next favorite read at our modern bookstore—where endless stories meet seamless browsing. Fast, user-friendly, and beautifully designed for readers and vendors alike!
</p>
       <div className=''> <button className='bg-yellow-100 text-black px-4 py-2 mt-4 rounded-full hover:bg-yellow-200 flex '>Explore the Books</button></div>
        </div>
        <div className='w-3/6 flex items-center justify-center rounded-md'>
        <img src="https://img.freepik.com/premium-photo/education-concept_877928-1497.jpg" alt="image" /></div>
      
    </div>
  )
}

export default Hom
