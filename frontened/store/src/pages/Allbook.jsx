import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Bookcard from '/src/components/Bookcard/Bookcard'
import { data } from 'react-router-dom';



const Allbook = () => {
    const [Data, setData] = useState([]);
   useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get('/api/v1/get-all-books');
     
      setData(response.data.books); 
    } catch (error) {
      console.error("Error fetching recent books:", error); 
    }
  };
  fetch();
}, []);

  return (
    <div className='mx- px-4 bg-zinc-900'>
      <h4 className='text-blue-50 text-3xl'>All-products</h4>
      <div className='my-8 text-blue-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {Data && Data.map((items, i) => ( 
         
  <div key={i}>
    <Bookcard data={items} />
  </div>
))}

      </div>
    </div>
  )
}

export default Allbook
