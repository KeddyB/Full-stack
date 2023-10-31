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
  const [fields, setFields] = useState(null);
  const [categories, setCategories] = useState(null);
  const [imageAsset, setImageAssets] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      
    </div>
  )
}

export default CreatePin
