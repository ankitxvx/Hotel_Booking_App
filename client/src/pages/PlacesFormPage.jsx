import React, { useEffect } from 'react'
import Perks from './Perks';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { useState } from 'react';   
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
 
export default function PlacesFormPage() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState('');
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setChecIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setmaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false);
    const [price,setPrice] = useState(100);
    useEffect(()=>{
        if(!id){
            return ;
        }
        axios.get('/places/'+id).then(response=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    },[id])
    async function savePlace(ev){
        ev.preventDefault();
        const placeData ={
            title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests,price
        }
        if(id){
            //update
            await axios.put('/places',{
                id, ...placeData
                
            } )
            setRedirect(true);
        }
        else{
            await axios.post('/places',{
                title,address,addedPhotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuests
            } )
            setRedirect(true);
        }
      
        
    }
     if(redirect){
        return <Navigate to ={'/account/places'}/>
     }
    return (
        <div>
        <AccountNav/>
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4 ">Title</h2>
                <p className='mt-3 text-grat-500 text-sm'>Title for your place should be short and classy</p>
                <input type='text'


                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    placeholder='title, for example: My appartment' />


                <h2 className="text-2xl mt-4 " >Address to This Place</h2>
                <input type='text'
                    value={address}
                    onChange={ev => setAddress(ev.target.value)}
                    placeholder='address' />

                <h2 className="text-2xl mt-4 " >Photos</h2>
                <p className=' text-gray-500 text-sm' >more = better</p>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <h2 className="text-2xl mt-4 " >Description</h2>
                <p className=' text-gray-500 text-sm' >Description of the Place</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                <h2 className="text-2xl mt-4 " >Perks</h2>
                <p className='mt-2 text-gray-500 text-sm' >Select all the Perks Here</p>
                <Perks
                    selected={perks}
                    onChange={setPerks} />
                <h2 className="text-2xl mt-4 " >Extra Info</h2>
                <p className=' text-gray-500 text-sm' >House rules , etc</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                <h2 className="text-2xl mt-4 " >Check in & out times</h2>
                <p className=' text-gray-500 text-sm' >add check in and out times, remember to have some time window for cleaning for room between guests</p>
                <div className=' grid  gap-2  grid-cols-2 md:grid-cols-4'>

                    <div>
                        <h3 className='mt-2 -mb-2'>Check in time</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setChecIn(ev.target.value)}
                            placeholder='15:00' />
                    </div>

                    <div className='mt-2 -mb-2'>
                        <h3>Check out in time</h3>
                        <input
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder='11' />
                    </div>

                    <div className='mt-2 -mb-2'>
                        <h3 className=''>Number of guests</h3>
                        <input type="number"
                            value={maxGuests}
                            onChange={ev => setmaxGuests(ev.target.value)} />
                    </div>
                    <div className='mt-2 -mb-2'>
                        <h3 className=''>Price Per Night</h3>
                        <input type="number"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <div className=''>
                    <button className='primary my-4'>Save</button>
                </div>

            </form>
        </div>
    )
}
