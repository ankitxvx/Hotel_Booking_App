import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from './Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState('');
    const [photoLink,setPhotoLink] = useState(''); 
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState('');
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setChecIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuest,setMaxGuests] = useState(1);
   async function addPhotoByLink(ev){
    ev.preventDefault();
    const {data:filename}  =  await axios.post('/upload-by-link',{link:photoLink});
    setAddedPhotos(prev=>{
        return [...prev,filename];
    })
    setPhotoLink('');
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
                    <form>
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
                        <div className='flex gap-2'>
                            <input  value= {photoLink} 
                             onChange={ev=>setPhotoLink(ev.target.value)} 
                             type="text" placeholder={'add photo using a link...'} />
                            <button  onClick={addPhotoByLink}  className="bg-gray-200 rounded-2xl px-4">Add&nbsp;photo</button>
                          </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length>0 && addedPhotos.map(link=>(
                                <div>
                                    <img className="rounded-2xl"src={"http://localhost:8080/uploads/"+link} alt="" /> 
                                </div>
                            ))}

                            <button  className=' flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-8 text-gray-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </button>
                        </div>

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
