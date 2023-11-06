import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill} from 'react-icons/bs'

import { client, urlFor } from '../client'
import { useState } from 'react'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin }) => {

    const [postHovered, setPostHovered] =  useState(false)
    const [savingPost, setSavingPost] = useState(false)

    const navigate = useNavigate();
    const user = fetchUser()

    const { postedBy, image, _id, destination } = pin;

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const savePin = (id) => {
        if(alreadySaved?.length === 0){
            setSavingPost(true);
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user.googleId
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false)
                })
        }
    }
    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className='m-2'>
            <div 
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
            >
                <img src={urlFor(image).width(250).url()} className='rounded-lg w-full' alt="postedby" />
                {postHovered && (
                <div 
                    className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                    style={{ height :'100%' }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <a 
                                href={`${image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className='bg-white h-9 w-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity:100 hover:shadow-md outline-none'
                            >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                        { alreadySaved?.length !== 0 ? (
                            <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-lg outline-none'>
                                {pin?.save?.length} Saved
                            </button>
                        ) : (
                            <button
                                onClick = {(e) =>{
                                    e.stopPropagation();
                                    savePin(_id)
                                }}
                                type='button' 
                                className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-lg outline-none'
                            >
                                {pin?.save?.length}  {savingPost ? 'Saving' : "Save"}
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                        {destination && (
                            <a
                                href={destination}
                                rel='noreferrer'
                                target= '_blank'
                                className='bg-white flex items-center gap-2 text-black font-bold p-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'    
                            >
                                <BsFillArrowUpRightCircleFill />
                                {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                            </a>
                        )}
                        {postedBy?._id === user.googleId && (
                            <button
                                type='button'
                                onClick={(e) =>{
                                    e.stopPropagation();
                                deletePin(_id)
                                }}
                                className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-full hover:shadow-lg outline-none'
                            >
                                <AiTwotoneDelete />
                            </button>
                        )}
                    </div>
                </div>
            )}
            </div>
            <Link to={`user-profile/${postedBy?._id}`}
                className='flex gap-2 mt-2 items-center'
            >
                <img 
                    src={postedBy?.image} 
                    alt="user-profile" 
                    className='w-8 h-8 rounded-full object-cover'
                />
                <p className="font-semibold">{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin