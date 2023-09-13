import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from './Perks';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';

export default function PlacesPage() {
    const { action } = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState('');

    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState('');
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setChecIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuest,setMaxGuests] = useState(1);
  
function addNewPlace(ev){
    ev.preventDefault();
    
}


    return (
        <div>
            {action != 'new' && (
                <div className="text-center">
                    <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add a New Place</Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form onSubmit={addNewPlace}>
                        <h2 className="text-2xl mt-4 ">Title</h2>
                        <p className='mt-3 text-grat-500 text-sm'>Title for your place should be short and classy</p>
                        <input type='text' 


                        value = {title} 
                        onChange={ev=>setTitle(ev.target.value)} 
                        placeholder='title, for example: My appartment' />


                        <h2 className="text-2xl mt-4 " >Address to This Place</h2>
                        <input type='text' 
                        value = {address} 
                        onChange={ev=>setAddress(ev.target.value)}
                        placeholder='address' />

                        <h2 className="text-2xl mt-4 " >Photos</h2>
                        <p className=' text-gray-500 text-sm' >more = better</p>
                       <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                        <h2 className="text-2xl mt-4 " >Description</h2>
                        <p className=' text-gray-500 text-sm' >Description of the Place</p>
                        <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
                        <h2 className="text-2xl mt-4 " >Perks</h2>
                        <p className='mt-2 text-gray-500 text-sm' >Select all the Perks Here</p>
                         <Perks 
                         selected={perks} 
                         onChange={setPerks}/>

                         <h2 className="text-2xl mt-4 " >Extra Info</h2>
                            <p className=' text-gray-500 text-sm' >House rules , etc</p>
                             <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
                             <h2 className="text-2xl mt-4 " >Check in & out times</h2>
                            <p className=' text-gray-500 text-sm' >add check in and out times, remember to have some time window for cleaning for room between guests</p>
                            <div className=' grid  gap-2  sm:grid-cols-3'>
                                
                                <div>
                                <h3 className='mt-2 -mb-2'>Check in time</h3>
                                    <input type="text" 
                                     value={checkIn} 
                                     onChange={ev=>setChecIn(ev.target.value)} 
                                     placeholder='15:00'/>
                                </div>
                               
                                <div className='mt-2 -mb-2'>
                                   <h3>Check out in time</h3>
                                    <input 
                                    value={checkOut}
                                     onChange={ev=>setCheckOut(ev.target.value)} type="text" placeholder='11' />
                                </div>
                                
                                <div className='mt-2 -mb-2'>
                                    <h3 className=''>Number of guests</h3>
                                    <input type="number" 
                                     value={maxGuest} 
                                     onChange={ev=>setMaxGuests(ev.target.value)}/>
                                </div>
                            </div>
                            <div className=''>
                                <button className='primary my-4'>Save</button>
                            </div>

                    </form>
                </div>
            )}

        </div>
    )
}