import React, { useEffect } from 'react'
import Image from 'next/image'

const SinglePerkList = ({Perks, Type, isSmallScreen}) => {
  if(!Perks){
    return <p>Loading...</p>
  }

  return (
    <div className='h-full bg-slate-800 flex flex-col items-center'>
      <h2 className='mb-5'>{Type}</h2>
      <ul>
        {Perks.map((perk, index) => (
          <li key={index} className='mb-3 flex items-center'>
            {perk.hasIcon && <Image src={perk.icon} height={50} width={50} alt="weapon-screenshot" className=""/>}
            {!isSmallScreen && perk.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SinglePerkList