import React, { useEffect } from 'react'

const SinglePerkList = ({Perks, Type}) => {
  if(!Perks){
    return <p>Loading...</p>
  }

  return (
    <div className='h-full bg-slate-800'>
      <h2 className='mb-5'>{Type}</h2>
      <ul>
        {Perks.map((perk, index) => (
          <li key={index} className='mb-3'>{perk.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SinglePerkList