import React from 'react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
   const navigate = useNavigate();

  const handleclick = () => {
    navigate('/signin'); // Change '/signin' to your desired route
  };
   const handleclick1 = () => {
    navigate('/'); // Change '/signin' to your desired route
  };
    const handleclick2 = () => {
    navigate('/allbook'); // Change '/signin' to your desired route
  };
  const handleclick3 = () => {
    navigate('/Signup'); // Change '/signin' to your desired route
  };
  return (
    <div className='bg-zinc-800 text-white flex justify-between items-center p-4 '>
     <div className='flex items-center'>
        <img  className='h-10 me-4' src="https://wallpaperwave.com/wp-content/uploads/2023/08/jharkins_creat_a_3d_logo_of_a_book_flipping_open_471feb49-d2e6-4b37-b122-137a2ba88652.png" alt="logo" />
        <h2 className='text-2xl font-semibold '>BOOKZONE</h2>
     </div>
     <div className='flex flex-col md:flex-row items-center gap-4'>
        <ul className='flex gap-4'>
            <li onClick={handleclick1} className='hover:text-blue-400 cursor-pointer'>Home</li>
            <li onClick={handleclick2} className='hover:text-blue-400 cursor-pointer'>Products</li>
            <li className='hover:text-blue-400 cursor-pointer'>cart</li>
        
        </ul>
        <div className='flex gap-4 mt-2'>
          <button onClick={handleclick} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>sign-in</button>
          <button onClick={handleclick3} className='bg-green-400 text-white px-4 py-2 rounded-md hover:bg-blue-600'>sign-up</button>
          
          
        </div>
     </div>
    </div>
  )
}

export default Navbar
