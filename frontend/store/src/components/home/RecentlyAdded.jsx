import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Bookcard from '/src/components/Bookcard/Bookcard'
import { data } from 'react-router-dom';



const RecentlyAdded = () => {
    const [Data, setData] = useState([]);
   useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get('/api/v1/get-recent-books');
      
      setData(response.data.books); 
    } catch (error) {
      console.error("Error fetching recent books:", error); 
    }
  };
  fetch();
}, []);

  return (
    <div className='mx-8 px-4'>
      <h4 className='text-blue-50 text-3xl'>recently added books</h4>
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

export default RecentlyAdded
