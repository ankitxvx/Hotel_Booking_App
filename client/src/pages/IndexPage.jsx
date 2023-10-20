import React, { useEffect, useState } from 'react'

import Header from '../Header'
import axios  from 'axios';
export default function IndexPage() {
    const [places,setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/places').then(response=>{
            setPlaces([...response.data,...response.data,...response.data,...response.data])
        })
    })
    return (
        <div className='mt-8 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
              {places.length>0 && places.map(place =>(
                <div className="">
                    <div className=" mb-2 gap-x-6 gap-y-8 bg-gray-500 rounded-2xl flex">
                    {place.photos?.[0] && (
                        <img  className= "rounded-2xl object-cover aspect-square"src={'http://localhost:8080/uploads/'+place.photos?.[0]} alt="" />
                        )}  
                    </div>
                    <h2 className='font-bold'>{place.address}</h2>
                    <h3 className='text-sm  text-gray-500  '> {place.title}</h3>
                    
                    <div className="mt-1"> 
                      <span className='font-bold'>${place.price}</span> per Night
                    </div>
                </div>
              ))}
        </div>
    )
}

