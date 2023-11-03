import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAssets] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0]

    if(type === 'image/png' || type === 'image/svg' || type === 'image/gif' || type === 'image/tiff' || type === 'image/jpeg'){
      setWrongImageType(false)
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name})
        .then((document) => {
          setImageAssets(document)
          setLoading(false)
        })
        .catch((error) => {
          console.log('Image upload error', error)
        })
    }else{
      setWrongImageType(true)
    }
  }

  const savePin = () => {
    if(title && about && destination &&imageAsset?._id && category){
      const doc = {
        type: 'pin',
        title,
        about,
        destination,
        image:{
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy:{
          _type: 'postedBy',
          _ref: user._id
        },
        category,
      }
      client
        .create(doc)
        .then(() => {
          navigate('/')
        })
    }else{
      setFields(true);

      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-500 ease-in">Please fill in all the fields</p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border -dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong Image Type</p> }
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click here to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high quality JPG, SVG, GIF or TIFF less than 20MB
                  </p>
                </div>
                <input type="file" name="upload-image" id="" placeholder='choose a file to upload'
                  className='w-0 h-0'
                  onChange={uploadImage}
                />
              </label>
            ):(
              <div className="relative h-full">
                <img src={imageAsset?.url} alt="uploaded pic" className='h-full w-full'/>
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duratioin-500 ease-in-out'
                  onClick={() => setImageAssets(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your Title here'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img src={user.image} alt="userprofile"
                className='w-10 h-10 rounded-full'
              />
              <p className='font-bold'>{user.userName}</p>
            </div>
          )}
          <input 
            type="text" 
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2' 
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='What is your Pin about?'
          />
          <input 
            type="text" 
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            placeholder='Add a destination link'
          />
          <div className="flex flex-col">
            <p className="mb-2 font-semi-bold text-lg sm:text-xl">Choose Pin Category</p>
            <select name="" id=""
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 cursor-pointer"
            >
              <option value="other" className='bg-white'>Select category</option>
              
              {categories.map((category) => (
                <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end items-end mt-5">
            <button 
              type='button'
              onClick={savePin}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
            >Save Pin</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreatePin