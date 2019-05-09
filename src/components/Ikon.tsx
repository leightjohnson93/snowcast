import React, { useState, useEffect } from 'react'
import Header from './Header'
import { Resort } from '../interfaces'
import axios from 'axios'

const Ikon = () => {
  // subject to change resort => mountain & weather?
  const [resorts, setResorts] = useState<Resort[]>([])
  const [sortBy, setSortBy] = useState<string>('snowfall')

  useEffect(() => {
    axios(
      'https://skiapp.onthesnow.com/app/widgets/resortlist?region=us&regionids=1542&language=en&pagetype=skireport'
    ).then(({ data }) => setResorts(data.rows))
  }, [])
  return (
    <div>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      Ikon resorts are currently in development.
      {resorts.map((resort: Resort) => (
        <li>{resort.pastSnow.sum3}</li>
      ))}
    </div>
  )
}

export default Ikon
