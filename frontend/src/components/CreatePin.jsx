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
  const [categories, setCategories] = useState(null);
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
      </div>
    </div>
  )
}
export default CreatePin