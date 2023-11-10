import React from 'react'
import { useEffect, useState } from 'react'

import MasonryLayout from './MasonryLayout'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)
  return (
    <div>
      {loading && <Spinner message={'searching for pins'}/>} 
    </div>
  )
}

export default Search
