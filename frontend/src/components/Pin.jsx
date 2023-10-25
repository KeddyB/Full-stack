import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwoToneDelete } from 'react-icons/ai'
import { BsFillArrowUpRughtCircleFill} from 'react-icons/bs'

import { urlFor } from '../client'
import { useState } from 'react'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin: { postedBy, image, _id, destination, save }  }) => {

const [postHovered, setPostHovered] =  useState(false)
const [savingPost, setSavingPost] =  useState(false)
const navigate = useNavigate();
const user = fetchUser()

const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length

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
                    { alreadySaved ? (
                        <button>
                            Saved
                        </button>
                    ):(
                        <button type='button' className='bg-red-500 opcaity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                            Save
                        </button>
                    )}
                </div>
            </div>
        )}
        </div>
    </div>
  )
}

export default Pin