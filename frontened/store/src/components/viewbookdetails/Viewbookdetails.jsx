import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'

const Viewbookdetails = () => {

const { id } = useParams();
console.log(id);
  const [Data, setData] = useState([]);
   useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get(`/api/v1/get-book-by-id/${id}`);
     console.log(response);
      setData(response.data.book); 
    } catch (error) {
      console.error("Error fetching recent books:", error); 
    }
  };
  fetch();
}, []);

  
  return (
   <>
   {Data && (
     <div  className='bg-zinc-900 shadow-md  p-4 flex  '>
        <div className='bg-zinc-800  p-4 h-[88vh] w-3/6 flex item-center justify-center rounded-xl' >
        <img src={Data.url} alt="" className='rounded h-[70vh]' />
        </div>
        <div className='p-4 w-3/6' >
        <h1 className='text-4xl text-zinc-200 font-semibold  '>{Data.title}</h1>
        <p className='text-zinc-300 mt-1' >by {Data.author} </p>
        <p className='text-zinc-500 mt-4 text-xl' >Descripton:  {Data.desc} </p>
        <p className='text-zinc-400 mt-4 text-xl' >Language: {Data.language} </p>
        <p className='text-zinc-50 mt-4 text-4xl' >Price: ₹{Data.price} </p>
        </div>
      
    </div>
   
   )}
   {!Data && (
    <div className='h-screen bg-zinc-900 flex item-center justify-center'>loading......</div>
   )}
   
   </>
  )
}

export default Viewbookdetails
